import express from 'express';

import postController from '../../controllers/postController/post.controller.js';
import upload from '../../middleware/fileUpload.js';
import {verifyToken} from '../../middleware/Auth.js';

const router = express.Router();

router.post('/createPost',verifyToken,upload ,postController.createPost);
router.get('/getPosts',verifyToken, postController.getPosts);

export default router;