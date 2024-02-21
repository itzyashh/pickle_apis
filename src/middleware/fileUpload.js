// Importing the required modules
import multer from "multer";
import path from "path";
import { promisify } from "util";
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from "multer-s3";

/**
 * Multer disk storage configuration for file uploads
 * @type {Object}
 */

const s3 = new S3Client({ 
    credentials: {
        accessKeyId: process.env.S3_ACCESS_ID,
        secretAccessKey: process.env.S3_SECRET_KEY
    },
    region: process.env.S3_REGION
 });

const storage = multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })

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
})

// Export the multer configuration for file uploads
export default upload;
