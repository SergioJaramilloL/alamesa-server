const jwt = require('jsonwebtoken')
const { models } = require('mongoose')
const { transporter } = require('../utils/mailer')
const { recoveryPassword } = require('../utils/email_templates/passRecovery')

module.exports = {
  async recoverypass( req, res ) {
    try {
      const { email } = req.body;

      const client = await models.Client.findOne({ email });

      if ( client === null ) throw new Error('el email no existe en alamesa')

      const token = jwt.sign(
        { recovery: 'password'},
        process.env.SECRET,
        { expiresIn: 60*60*1 }
      );
      await transporter.sendMail(recoveryPassword(email,token))
      res.status(201).json({ message: 'mensaje de recuperacion enviado' })
    }catch(error) {
      res.status(400).json({ message: error.message })
    }
  }
}
