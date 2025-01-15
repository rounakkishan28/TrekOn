import Chat from '../models/chat-model.js';
import User from '../models/user-model.js';

const accessChat = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        console.log(req.user._id);
        let isChat = await Chat.find({
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: id } } }
            ]
        })
        .populate("users", "-password")
        .populate("latestMessage");
        isChat = await User.populate({
            path: 'latestMessage.sender',
            select: 'name photo email',
        });
        if (isChat.length > 0) return res.json({ success: true, data: isChat[0] });
        const createdChat = await Chat.create({
            chatName: "sender",
            users: [req.user._id, id],
        });
        res.json({ success: true, data: createdChat });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const fetchChats = async (req, res) => {
    try {
        await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate("users", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async(chats) => {
            chats = await User.populate(chats, {
                path: 'latestMessage.sender',
                select: 'username photo email',
            })
            res.json({ success: true, chats });
        })
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Failed to fetch chats.', error });
    }
};

export { accessChat, fetchChats };
