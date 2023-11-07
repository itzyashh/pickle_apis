import express from 'express';
const rootRouter = express.Router();

import userRouter from './userRoutes/user.route.js';

rootRouter.use('/user', userRouter);

export default rootRouter;