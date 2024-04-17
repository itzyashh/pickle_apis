
import ChatModel from '../../models/chat.js';



const createPrivateChat = async (req, res) => {
    console.log('reqbody',req.body)
    const {userId} = req.body;

    let userIds = [req.user.id,userId]

   try {

    const existingChat = await ChatModel.findOne(
        {
            users:{$all: userIds},
            type: 'private'
        }
    );
    if(existingChat){
        return res.status(200).json({ existingChat });
    }

    const newChat = new ChatModel({
        users: userIds
    })

    await newChat.save();
    res.status(200).json({ newChat });
   } catch (error) {
         console.log(error)
         res.status(500).json({ message: 'Internal server error' });
   }

}

const createGroupChat = async (req, res) => {
    const {userIds,
        chatName,
    } = req.body;

    if(!userIds || !chatName){
        return res.status(400).json({ message: 'All fields are required' });
    }

    let allUsers = userIds
    allUsers.push(req.user.id);

   try {

    const existingChat = await ChatModel.findOne({
        users:{$all: allUsers},
        type: 'group'
    });
    if(existingChat){
        return res.status(200).json({ existingChat });
    }

    const newChat = new ChatModel({
        users: userIds,
        chatName,
        type: 'group',
        groupAdmin: req.user.id
    })

    await newChat.save();
    res.status(200).json({ newChat });
   } catch (error) {
         console.log(error)
         res.status(500).json({ message: 'Internal server error' });
   }
}

const myChats = async (req, res) => {
    console.log(req.user.id)
    console.log('my chats',req.user.id)
    try {
        const chats = await ChatModel.find({ users: req.user.id }).populate({
            path: 'users',
            select: 'userName'

        }).catch(err => {
            console.log('err populating', err)
        });
        res.status(200).json({ data:chats });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default {
    createPrivateChat,
    createGroupChat,
    myChats
}