
import PostModel from '../../models/post.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
const baseUrl = 'http://localhost:3000/';

const createPost = async (req, res) => {
    try {
        console.log(req.files)
        const files = req.files
        const media = files.map((file,i)=>{
            return {
                type: file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' ? 'image' : 'video',
                url: baseUrl + file.filename
            }
        })

        req.body.media = media
        const result = await PostModel.create(req.body);
        res.status(201).json({ result });

    } catch (error) {
        res.status(500).json({status:'success', message: "Something went wrong" });
        console.log(error);
    }
}

const getPosts = async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const user_id = req.query.user_id;
    const totalPosts = await PostModel.countDocuments({});
    console.log(totalPosts);

    const totalPage = Math.ceil(totalPosts / limit);
    const startIndex = (page - 1) * limit;


    try {
        const result = await PostModel.aggregate([
            {
                $lookup: {
                    from: "likes",
                    let: { post_id: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$post_id", "$$post_id"] },
                                        { $eq: ["$user_id", new mongoose.Types.ObjectId(user_id)] },
                                    ],
                                },
                            },
                        },
                    ],
                    as: "likes",
                }
            },
            {
                $addFields: {
                    isLiked: { 
                        $cond: { 
                            if: { $gt: [{ $size: "$likes" }, 0] }, 
                            then: true, 
                            else: false 
                        
                    }
                }
            }
            },
            {
                $project: {
                    likes: 0,
                }
            },
            {
                $skip: startIndex,
            },
            {
                $limit: limit,
            },
            {
                $sort: {
                    createdAt: -1,
                }
            },
        ]);
        res.status(200).json({ result ,length:result.length,
            totalPage: totalPage,
            currentPage: page,
        });
    } catch (error) {
        console.log(error);
    }
}

export default {
    createPost,
    getPosts
}