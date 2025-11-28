const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    // service: "gmail",
    // auth: {
    //     user: "",
    // }
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'vesta.mohr75@ethereal.email',
        pass: 'SfCaEuhwBdWBzrR4bt'
    }
})

module.exports.sendMail = (email, otp) => {
    let mailOptions = {
        from: "OTP System",
        to: email,
        subject: "Forgot Password OTP",
        text: `Your OTP is ${otp}`
    }

    transport.sendMail(mailOptions)
}