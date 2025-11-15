const multer = require("multer");
const path = require("path");
// Define storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Different folder for images vs audio
        cb(null, "storage/");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // keep extension
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, uniqueName);
    },
});
// Multer upload middleware
const upload = multer({ storage });
module.exports = upload;
export {};
//# sourceMappingURL=uploads.js.map