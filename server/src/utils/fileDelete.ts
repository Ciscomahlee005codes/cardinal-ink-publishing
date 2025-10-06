const fs = require("fs");

async function DeleteFile(filePath: string) {
  fs.unlink(`${filePath}`, (err: any) => {
    if (err) {
      console.log(err);
      return false;
    }

    return true;
  });
}

module.exports = DeleteFile;
