import express from 'express';

import userController from '../../controllers/userControllers/user.controller.js';

const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);

export default router;