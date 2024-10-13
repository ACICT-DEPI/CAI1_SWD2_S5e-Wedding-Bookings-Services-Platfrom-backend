const express = require('express');
const multer = require('multer');
const router = express.Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // File name format
  },
});

// Configure multer
const upload = multer({ storage: storage });

// Define the upload endpoint
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const filePath = `http://localhost:8000/uploads/${req.file.filename}`; // Adjust to your hosting path
  res.status(200).json({ url: filePath });
});

module.exports = router;
