const jwt = require('jsonwebtoken')
const { models } = require('mongoose')
const { transporter } = require('../utils/mailer')
const { recoveryPassword } = require('../utils/email_templates/passRecovery')
const bcrypt = require('bcrypt')

module.exports = {
  async recoverypass( req, res ) {
    try {
      let user = ''
      const { email, userType } = req.body;
      if(userType === 'clients'){
        user = await models.Client.findOne({ email });
      } else {
        user = await models.Restaurant.findOne({ email });
      }

      if ( user === null ) throw new Error('el email no existe en alamesa')

      const token = jwt.sign(
        { email, userType },
        process.env.SECRET,
        { expiresIn: 60*60*1 }
      );
      await transporter.sendMail(recoveryPassword(email,token))
      res.status(201).json({ message: 'mensaje de recuperacion enviado exitosamente' })
    }catch(error) {
      res.status(400).json({ message: error.message })
    }
  },

  async resetpass( req, res ) {
    try {
      let user = ''
      req.client
      req.restaurant
      const { newPassword, userType } = req.body;
      const email = req.email;

      if(userType === 'clients'){
        user = await models.Client.findOne({ email });
      } else {
        user = await models.Restaurant.findOne({ email });
      }

      if ( user === null ) throw new Error('No existe cliente con ese correo en alamesa')

      const encPassword = await bcrypt.hash( newPassword, 8)

      if(userType === 'clients'){
        await models.Client.findByIdAndUpdate( user._id, { password: encPassword }, { new: true, useFindAndModify: false,})
      } else {
        await models.Restaurant.findByIdAndUpdate( user._id, { password: encPassword }, { new: true, useFindAndModify: false,})
      }

      res.status(201).json({ message: 'cambio de contraseña exitoso' })
    }catch(error) {
      res.status(400).json({ message: error.message })
    }
  }
}
