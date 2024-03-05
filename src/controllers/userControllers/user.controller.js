import UserModel from '../../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const createUser = async (req, res) => {
    try {
        const checkUser = await UserModel.findOne({$or:[{email: req.body.email},{userName: req.body.userName}]});
        if(checkUser) return res.status(409).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const result = await UserModel.create({...req.body, password: hashedPassword});
        const token = jwt.sign({email: result.email, id: result._id}, process.env.TOKEN_KEY, {expiresIn: "4 days"});
        result.token = token;
        res.status(201).json({ result });
    } catch (error) {
        res.status(500).json({status:'success', message: "Something went wrong" });
        console.log(error);
    }
}

const loginUser = async (req, res) => {
    try {
        const result = await UserModel.findOne({email: req.body.email})
        if(!result) return res.status(400).json({ message: "Invalid credentials" });
        const isPasswordCorrect = await bcrypt.compare(req.body.password, result.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({email: result.email, id: result._id}, process.env.TOKEN_KEY, {expiresIn: "4 days"});
        const deepClone = JSON.parse(JSON.stringify(result));
        delete deepClone.password;
        res.status(200).json({ ...deepClone , token });
    } catch (error) {
        res.status(500).json({status:'success', message: "Something went wrong" });
        console.log(error);
    }
}

const otpVerify = async (req, res) => {

    const otp = req.body.otp;
    if (!otp) {
        return res.status(400).json({ message: "OTP is required" });
    }
    if (otp === '1234') {
        try {
            const result = await UserModel.findOneAndUpdate({email: req.body.email}, {$set: {validOTP: true}}, {new: true}).select('-password');
            if(!result) return res.status(400).json({ message: "Invalid credentials" });
            res.status(200).json({ result,status:true });
        } catch (error) {
            res.status(500).json({status:'success', message: "Something went wrong" });
            console.log(error);
        }
    }
    else {
        return res.status(400).json({ message: "Invalid OTP" });
    }
    
}

const getAllUsers = async (req, res) => {
    try {
        const result = await UserModel.find().select('-password');
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({status:'success', message: "Something went wrong" });
        console.log(error);
    }
}

export default {
    createUser,
    loginUser,
    otpVerify,
    getAllUsers
}