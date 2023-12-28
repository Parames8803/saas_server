const generateOTP = () => {
  const otpLength = 4;
  const otp = Math.floor(Math.random() * Math.pow(10, otpLength));
  const OTP4 = otp.toString().padStart(otpLength, "0");
  return OTP4;
};

module.exports = generateOTP;
