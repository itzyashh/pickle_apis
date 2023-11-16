import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types;


const likeSchema = new mongoose.Schema({

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
},{timestamps: true});

const Like = mongoose.model('Like', likeSchema);


export default Like;