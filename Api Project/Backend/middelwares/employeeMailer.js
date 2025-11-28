const nodemailer = require("nodemailer")

const transport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'monty.lynch@ethereal.email',
        pass: 'FP72uA4PHVZzxZ1Tqu'
    }
})

module.exports.sendMail = (to, subject, html) => {
    let mailOptions = {
        from: "monty.lynch@ethereal.email",
        to,
        subject,
        html
    }
    transport.sendMail(mailOptions)
}