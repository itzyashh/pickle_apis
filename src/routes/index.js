import express from 'express';
const rootRouter = express.Router();

import userRouter from './userRoutes/user.route.js';
import postRouter from './postRoutes/post.routes.js';
import likeRouter from './likeRoutes/like.routes.js';
import commentRouter from './commentRoutes/comment.routes.js';

rootRouter.use('/user', userRouter);
rootRouter.use('/post', postRouter);
rootRouter.use('/like', likeRouter);
rootRouter.use('/comment', commentRouter);

export default rootRouter;