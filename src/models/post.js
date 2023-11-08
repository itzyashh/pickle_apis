import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types;
const mediaSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['image', 'video'],
        required: false
    }
});


const postSchema = new mongoose.Schema({
   media:[mediaSchema],
   description: {type: String},
   user_id:{
         type: ObjectId,
         ref: 'User',
         required: true
    },
    likeCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
   

});
const User = mongoose.model('User', postSchema);


export default User;