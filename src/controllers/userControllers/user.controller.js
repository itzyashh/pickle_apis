import UserModel from '../../models/user.js';

const createUser = async (req, res) => {
    try {
        const checkUser = await UserModel.findOne({$or:[{email: req.body.email},{userName: req.body.userName}]});
        if(checkUser) return res.status(409).json({ message: "User already exists" });
        const result = await UserModel.create(req.body);
        res.status(201).json({ result });
    } catch (error) {
        res.status(500).json({status:'success', message: "Something went wrong" });
        console.log(error);
    }
}

const loginUser = async (req, res) => {
    try {
        const result = await UserModel.findOne({email: req.body.email});
        if(!result) return res.status(404).json({ message: "User not found" }); 
        res.status(200).json({ result });
    } catch (error) {
        
    }
}

export default {
    createUser,
    loginUser
}