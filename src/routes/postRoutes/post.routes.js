import express from 'express';

import postController from '../../controllers/postController/post.controller.js';

import {verifyToken} from '../../middleware/Auth.js';
import fileUpload from '../../middleware/fileUpload.js';

const router = express.Router();

router.post('/createPost',verifyToken,fileUpload.array('file', 5) ,postController.createPost);
router.get('/getPosts',verifyToken, postController.getPosts);
router.post('/upload',fileUpload.single('file'),postController.fileUpload);

export default router;