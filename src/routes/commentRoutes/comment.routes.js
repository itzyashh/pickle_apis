import express from 'express';

import commentController from '../../controllers/commentController/commentController.js';
import {verifyToken} from '../../middleware/Auth.js';

const router = express.Router();

router.post('/addComment',verifyToken ,commentController.addComment);
router.delete('/deleteComment',verifyToken, commentController.deleteComment);
router.get('/postComments',verifyToken, commentController.postComments);

export default router;