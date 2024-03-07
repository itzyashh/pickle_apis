import express from 'express';

import {verifyToken} from '../../middleware/Auth.js';
import messageController from '../../controllers/messageControllers/message.controller.js';


const router = express.Router();


router.post('/sendMessage',verifyToken ,messageController.sendMessage);
router.get('/myMessages',verifyToken ,messageController.myMessages);

export default router;