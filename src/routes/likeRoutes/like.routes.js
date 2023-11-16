import express from 'express';

import likeController from '../../controllers/likeControllers/like.controller.js';
import {verifyToken} from '../../middleware/Auth.js';

const router = express.Router();

router.post('/likeDislike',verifyToken ,likeController.likeDislike);
router.get('/postLikes',verifyToken, likeController.postLikes);

export default router;