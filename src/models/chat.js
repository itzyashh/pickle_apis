import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;


const chatSchema = new mongoose.Schema({
    chatName: { type: String },
    type: {
        type: String,
        enum: ["group", "private"],
        default: "private"
    },
    users: [{ type: ObjectId, ref: "User", required: true }],
    lastMessage: { type: ObjectId, ref: "User" },
    groupAdmin: { type: ObjectId, ref: "User"}


}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);


export default Chat;