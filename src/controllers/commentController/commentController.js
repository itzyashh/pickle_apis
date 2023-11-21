

import jwt from 'jsonwebtoken';
import PostModel from '../../models/post.js';
import CommentModel from '../../models/comment.js';

const addComment = async (req, res) => {
    const {post_id, user_id, comment} = req.body
    
    try {
        const result = await CommentModel.create({post_id, user_id, comment});
        await PostModel.findByIdAndUpdate(
            post_id,
            { $inc: { commentCount: 1 } },
        );
        res.status(200).json({status:'success', message: "Comment added successfully" });

        }
        
        catch (error) {
        res.status(500).json({status:'success', message: "Something went wrong" });
        console.log(error);

        }
    
}

const deleteComment = async (req, res) => {
    const {post_id, comment_id} = req.body;

    const deletedComment=await CommentModel.findByIdAndDelete({_id:comment_id, post_id:post_id});

    if(!deletedComment){
        return res.status(400).json({status:'success', message: "Comment not found" });
    }

    await PostModel.findByIdAndUpdate(
        deletedComment.post_id,
        { $inc: { commentCount: -1 } },
    );
    res.status(200).json({status:'success', message: "Comment deleted successfully" });
}

const postComments = async (req, res) => {
    const {post_id,page,limit} = req.query;
    const totalComments = await CommentModel.countDocuments({ post_id});
    console.log(totalComments);


    const totalPage = Math.ceil(totalComments / limit);
    const startIndex = (page - 1) * limit;
    console.log(startIndex);
    try {
        const result = await CommentModel.find({ post_id}).populate({path:'user_id',select:'userName fullName'}).skip(startIndex).limit(limit).exec();
        res.status(200).json({ result ,totalComments:result.length,
            totalPage: totalPage,
            currentPage: page,
        
        });
    } catch (error) {
        
    }
}



export default {
    addComment,
    deleteComment,
    postComments
}