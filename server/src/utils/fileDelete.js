"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
async function DeleteFile(filePath) {
    fs.unlink(`${filePath}`, (err) => {
        if (err) {
            console.log(err);
            return false;
        }
        return true;
    });
}
module.exports = DeleteFile;
//# sourceMappingURL=fileDelete.js.map