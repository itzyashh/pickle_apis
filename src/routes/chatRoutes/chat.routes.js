import express from 'express';

import {verifyToken} from '../../middleware/Auth.js';
import chatController from '../../controllers/chatControllers/chat.controller.js';

const router = express.Router();

router.post('/createPrivateChat',verifyToken ,chatController.createPrivateChat);
router.post('/createGroupChat',verifyToken ,chatController.createGroupChat);

export default router;