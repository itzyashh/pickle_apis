import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types;


const commentSchema = new mongoose.Schema({

   user_id:{
         type: ObjectId,
         ref: 'User',
         required: true
    },
   post_id:{
         type: ObjectId,
         ref: 'Post',
         required: true
    },
    comment:{
            type: String,
            required: true
     },
},{timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);


export default Comment;