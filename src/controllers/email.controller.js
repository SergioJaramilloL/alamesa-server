const jwt = require('jsonwebtoken')
const { models } = require('mongoose')
const { transporter } = require('../utils/mailer')
const { recoveryPassword } = require('../utils/email_templates/passRecovery')
const bcrypt = require('bcrypt')

module.exports = {
  async recoverypass( req, res ) {
    try {
      const { email } = req.body;
      const client = await models.Client.findOne({ email });

      if ( client === null ) throw new Error('el email no existe en alamesa')

      const token = jwt.sign(
        { email },
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
      const { passwordConfirm } = req.body;
      const email = req.email;
      const client = await models.Client.findOne({ email })

      if ( client === null ) throw new Error('No existe cliente con ese correo en alamesa')

      const encPassword = await bcrypt.hash( passwordConfirm, 8)

      await models.Client.findByIdAndUpdate( client._id, { password: encPassword }, { new: true, useFindAndModify: false,})

      res.status(201).json({ message: 'cambio de contraseña exitoso' })
    }catch(error) {
      res.status(400).json({ message: error.message })
    }
  }
}
