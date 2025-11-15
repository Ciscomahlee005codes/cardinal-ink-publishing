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
export {};
//# sourceMappingURL=fileDelete.js.map