
import ChatModel from '../../models/chat.js';
import MessageModel from '../../models/message.js';



// const sendMessage = async (req, res) => {

//     const { text , chatId } = req.body;

//     try {
//     const message = new MessageModel({
//         text,
//         senderId: req.user.id,
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
        senderId: req.user.id,
        chatId,
    });

    await message.save();
    await ChatModel.findByIdAndUpdate(chatId,{
        lastMessage: message._id,
    },{
        new: true
    }
    )

    res.status(201).json({ message: "Message sent successfully!", data: message });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }

}

const myMessages= async (req, res) => {
    const { chatId } = req.body;    
    try {
        const messages= await MessageModel.find({ chatId }).populate({
            path: 'senderId',
            select: 'userName',
        })
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