module.exports = function generateOtp(length: number) {
  const characters =
    "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  let result = "";

  for (let index = 0; index < length; index++) {
    let otp = Math.floor(Math.random() * characters.length);
    result += characters[otp];
  }

  return result;
};
