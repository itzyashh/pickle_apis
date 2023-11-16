
import LikeModel from '../../models/like.js';
import jwt from 'jsonwebtoken';
import PostModel from '../../models/post.js';

const likeDislike = async (req, res) => {
    const {post_id, user_id} = req.body
    try {

        const currentLike = await LikeModel.findOne({post_id, user_id});
        
        if (!currentLike) {
            await LikeModel.create(req.body);
            await PostModel.findByIdAndUpdate(
                post_id,
                { $inc: { likeCount: 1 } },
                { new: true }
            );
            res.status(200).json({status:'success', message: "Post liked successfully" });
        }
        else {

            await LikeModel.findByIdAndDelete(currentLike._id);
            await PostModel.findByIdAndUpdate(
                post_id,
                { $inc: { likeCount: -1 } },
            );
            res.status(200).json({status:'success', message: "Post disliked successfully" });
        }

    } catch (error) {
        res.status(500).json({status:'success', message: "Something went wrong" });
        console.log(error);
    }
}

const postLikes = async (req, res) => {
    const {post_id} = req.query;
    try {
        const result = await LikeModel.find({ post_id}).populate({path:'user_id',select:'userName fullName'})
        res.status(200).json({ result ,totalLikes:result.length });
    } catch (error) {
        
    }
}

export default {
    likeDislike,
    postLikes
}