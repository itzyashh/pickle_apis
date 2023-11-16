
import PostModel from '../../models/post.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

    try {
        const result = await PostModel.find({});
        res.status(200).json({ result ,length:result.length });
    } catch (error) {
        
    }
}

export default {
    createPost,
    getPosts
}