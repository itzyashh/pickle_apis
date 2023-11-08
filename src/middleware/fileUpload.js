// Importing the required modules
import multer from "multer";
import path from "path";
import { promisify } from "util";

/**
 * Multer disk storage configuration for file uploads
 * @type {Object}
 */

const storage = multer.diskStorage({
    /**
     * Destination folder for uploaded files
     * @param {Object} req - Express request object
     * @param {Object} file - Uploaded file object
     * @param {Function} cb - Callback function to call when done
     */
    destination: function (req, file, cb) {
        cb(null, 'src/public/uploads');
    },
    /**
     * Filename for uploaded files
     * @param {Object} req - Express request object
     * @param {Object} file - Uploaded file object
     * @param {Function} cb - Callback function to call when done
     */
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

/**
 * Multer configuration for file uploads
 * @type {Object}
 */
const upload = multer({
    storage: storage,
    /**
     * File filter function for uploaded files
     * @param {Object} req - Express request object
     * @param {Object} file - Uploaded file object
     * @param {Function} cb - Callback function to call when done
     */
    fileFilter: function (req, file, cb) {
        // Allowed file types
        const filetypes = /jpeg|jpg|png|mp4|mov/;
        // Check if the uploaded file's mimetype is allowed
        const mimetype = filetypes.test(file.mimetype);
        // Check if the uploaded file's extension is allowed
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            // If the file is allowed, return true
            return cb(null, true);
        } else {
            // If the file is not allowed, return an error message
            cb('Error: Images and videos only! (jpeg, jpg, png, mp4, mov)');
        }
    }
}).fields([
    // Define the fields for file uploads
    { name: 'files', maxCount: 5 },
]);

// Export the multer configuration for file uploads
export default promisify(upload);
