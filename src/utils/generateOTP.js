const generateOTP = () => {
    // Define the length of the OTP
    const otpLength = 4;
    // Generate a random number with the specified length
    const otp = Math.floor(Math.random() * Math.pow(10, otpLength));
    // Pad the OTP with leading zeros if necessary
    const OTP4 = otp.toString().padStart(otpLength, '0');
    return OTP4;
}

module.exports = generateOTP;