const sgMail = require('@sendgrid/mail')
const sendApiKey = "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"

sgMail.setApiKey(sendApiKey)

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