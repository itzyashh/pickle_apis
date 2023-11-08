import express from 'express';

import postController from '../../controllers/postController/post.controller.js';
import upload from '../../middleware/fileUpload.js';

const router = express.Router();

router.post('/createPost',upload ,postController.createPost);
router.post('/getPosts', postController.getPosts);

export default router;