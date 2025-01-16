const multer = require('multer');

// Configure multer storage options
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Path to the 'uploads' folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Unique suffix for file
        const originalname = file.originalname; // Get the original file name
        const fileExtension = originalname.slice(((originalname.lastIndexOf(".") - 1) >>> 0) + 2); // Extract extension
        const newFilename = file.fieldname + '-' + uniqueSuffix + '.' + fileExtension; // Create new file name
        cb(null, newFilename); // Set the filename for the uploaded file
    }
});

// Initialize multer with the storage configuration
const uploads = multer({ storage: storage });

// Middleware to handle file upload
const uploadFile = (req, res, next) => {
    const singleUpload = uploads.single('std_image'); // Expecting file with the name 'std_image'
  
    singleUpload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message }); // Handle errors
        }
        next(); // Proceed to next middleware if upload is successful
    });
};

module.exports = uploadFile;
