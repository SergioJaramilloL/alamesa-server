const nodemailer = require('nodemailer');
const { recoveryPassword } = require('./email_templates/passRecovery');

exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

exports.verify = async (transporter) => {
  const connection = await transporter.verify()
  if(connection){
    console.log('Server is ready to take our message')
  }
}

