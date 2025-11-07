const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "darshankadivar@gmail.com",
        pass : "dmmmxgmjqbrkeskp"
    }
})

module.exports.sendOtp = (to,otp) => {
    let mailoptions = {
        from: "darshankadivar@gmail.com",
        to: to,
        subject: "Forgot password OTP",
        text: `Your OTP is ${otp}`
    }

    transport.sendMail(mailoptions)
}