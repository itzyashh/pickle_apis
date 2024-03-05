import express from 'express';

import userController from '../../controllers/userControllers/user.controller.js';

const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/otp-verify', userController.otpVerify);
router.get('/all-users', userController.getAllUsers);

export default router;