import UserModel from '../../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createPost = async (req, res) => {
    console.log('createPost')
    try {
        console.log(req.files)
    } catch (error) {
        res.status(500).json({status:'success', message: "Something went wrong" });
        console.log(error);
    }
}

const getPosts = async (req, res) => {
    console.log('getPosts')
    try {
        // const result = await UserModel.findOne({email: req.body.email});
        // if(!result) return res.status(400).json({ message: "Invalid credentials" });
        // const isPasswordCorrect = await bcrypt.compare(req.body.password, result.password);
        // if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
        // const token = jwt.sign({email: result.email, id: result._id}, process.env.TOKEN_KEY, {expiresIn: "1h"});
        // res.status(200).json({ result , token });
    } catch (error) {
        
    }
}

export default {
    createPost,
    getPosts
}