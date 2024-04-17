import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;


const messageSchema = new mongoose.Schema({
    text: { type: String , required: true},
    user: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    chatId: {
        type: ObjectId,
        ref: "Chat",
        required: true,
    },


}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);


export default Message;