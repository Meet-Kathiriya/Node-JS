const nodemailer = require("nodemailer")

const transport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'margaretta32@ethereal.email',
        pass: 'YmM2aXtBSpXCvHRTbU'
    }
})

module.exports.sendMail = (to, subject, html) => {
   let mailOptions = {
     from:"margaretta32@ethereal.email",
     to,
     subject, 
     html
   }

   transport.sendMail(mailOptions)
}