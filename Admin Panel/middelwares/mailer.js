const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "zyxcab101819@gmail.com",
        pass : "jsbdfgyuba"
    }
})

module.exports.sendOtp = (to,otp) => {
    let mailoptions = {
        from: "zyxcab101819@gmail.com",
        to: to,
        subject: "Forgot password OTP",
        text: `Your OTP is ${otp}`
    }

    transport.sendMail(mailoptions)
}