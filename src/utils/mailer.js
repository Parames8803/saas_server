const nodeMailer = require('nodemailer')
require('dotenv').config()

const service = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_EMAIL_PASS
    }
})

const verifyEmail = async (email, otp) => {
   try {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: 'santhosh@mailinator.com',          // "prem@mailinator.com"
        subject: "Your One-Time Password (OTP) for Password Reset",
        text: `Dear User,
        We have received a request to reset your password. Please use the following One-Time Password (OTP) to proceed with the password reset process:    
        OTP: ${otp}    
        If you did not initiate this request, please ignore this email. No changes will be made to your account.     
        Thank you. 
        Best regards,
        My Developers Team`
    }

    await service.sendMail(mailOptions, (err, res) => {
        if (err) console.log(err)
    })

    return true
   } catch (error) {
    res.status(500).json({ message : "Internal Server Error" })
    console.log(error)
   }
}

module.exports = verifyEmail;