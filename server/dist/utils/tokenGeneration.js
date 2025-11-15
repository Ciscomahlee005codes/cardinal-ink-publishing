"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateOtp(length) {
    const characters = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    let result = "";
    for (let index = 0; index < length; index++) {
        let otp = Math.floor(Math.random() * characters.length);
        result += characters[otp];
    }
    return result;
}
module.exports = generateOtp;
//# sourceMappingURL=tokenGeneration.js.map