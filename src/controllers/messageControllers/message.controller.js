
import ChatModel from '../../models/chat.js';
import MessageModel from '../../models/message.js';



// const sendMessage = async (req, res) => {

//     const { text , chatId } = req.body;

//     try {
//     const message = new MessageModel({
//         text,
//         user: req.user.id,
//         chatId,
//     });

//     await ChatModel.findByIdAndUpdate(chatId,{
//         lastMessage: text,
//     },{
//         new: true
//     }
//     )

//     await message.save();
//     res.status(201).json({ message: "Message sent successfully!", data: message });
//     }
//     catch (error) {
//         res.status(500).json({ message: "Internal server error" });
//     }


   

// }

const sendMessage = async (req, res) => {

    const { text , chatId } = req.body;

    try {
    const message = new MessageModel({
        text,
        user: req.user.id,
        chatId,
    });

    await message.save();
    await ChatModel.findByIdAndUpdate(chatId,{
        lastMessage: text,
    },{
        new: true
    }
    ).catch((error) => {
        console.log(' error in updating chat last message', error)
    })

    res.status(201).json({ message: "Message sent successfully!", data: message });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }

}

const myMessages= async (req, res) => {
    const chatId = req.query.chatId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const messages= await MessageModel.find({ chatId }).populate({
            path: 'user',
            select: 'userName',
        }).sort({ createdAt: -1 }).skip(skip).limit(limit);
        res.status(200).json({ data:messages});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}


export default {
    sendMessage,
    myMessages
}