
import PostModel from '../../models/post.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
const baseUrl = 'http://localhost:3000/';

const createPost = async (req, res) => {
    try {
        console.log(req.files)
        if (!req.files) {
            return res.status(400).send('No files were uploaded.');
        }
        const files = req.files
        const media = files.map((file,i)=>{
            return {
                type: file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' ? 'image' : 'video',
                url: file.location
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

const fileUpload = async (req, res) => {
    try {
        const file = req.file
        console.log('file',file)
        if (!file) {
            return res.status(400).send('No file was uploaded.');
        }
        const media = (file,i)=>{
            return {
                type: file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' ? 'image' : 'video',
                url: baseUrl + file.filename
            }
        }
        const data = {
            url:file.location,
            type: file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' ? 'image' : 'video',
        }
        res.status(201).json({ 
            status:'success',
            message: "File uploaded successfully",
            data
         });
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
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind: "$user",
                
            },
            {
                $project: {
                    likes: 0,
                    user: {
                        password: 0,
                        fcm_token: 0,
                        is_deleted: 0,
                        links: 0,
                        device_type: 0,
                        token: 0,
                        validOTP: 0,
                    },
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
    getPosts,
    fileUpload
}