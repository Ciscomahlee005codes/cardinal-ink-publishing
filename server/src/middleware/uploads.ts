const multer = require("multer");
const path = require("path");

// Define storage
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    // Different folder for images vs audio
    cb(null, "storage/");
  },
  filename: (req: any, file: any, cb: any) => {
    const ext = path.extname(file.originalname); // keep extension
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

// Multer upload middleware
const upload = multer({ storage });

module.exports = upload;
