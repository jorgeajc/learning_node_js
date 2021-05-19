const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SEND_API_KEY_EMAIL)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email, // Change to your recipient
        from: 'albertop2203@gmail.com', // Change to your verified sender
        subject: 'Welcome to my web page learning nodejs',
        text: 'Hola ' + name
    })
}

const sendGoodBayEmail = (email, name) => {
    sgMail.send({
        to: email, // Change to your recipient
        from: 'albertop2203@gmail.com', // Change to your verified sender
        subject: 'Good bay',
        text: ':) ' + name
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodBayEmail
}