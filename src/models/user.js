import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    bio: {
        type: String,
        required: false
    },
    links: {
        type: Array,
        default: [],
        required: false
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    fcm_token: {
        type: String,
        default: null
    },
    validOTP:{
        type:Boolean,
        default:false
    },
    device_type: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: null
    },

});
const User = mongoose.model('User', userSchema);


export default User;