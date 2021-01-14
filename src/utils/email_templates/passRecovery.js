
exports.recoveryPassword = (email, token) => {
  return {
    from:`"${process.env.MAIL_USERNAME}" <${process.env.MAIL_USER}>`,
    to: email,
    subject: 'Recovery Password',
    html: `
      <div>
        <h1>Cambio de contraseña</h1>
        <p>token: ${token}</p>
      </div>
    `,
    text: `Por favor haga clic en el siguiente enlace para
          resetear su contraseña`

  }
}
