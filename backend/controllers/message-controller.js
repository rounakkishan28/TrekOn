import Message from "../models/message-model.js";
import Chat from "../models/chat-model.js";
import User from "../models/user-model.js";

const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
        .populate("sender", "username photo email")
        .populate("chat");
        res.json({ success: true, messages });
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.json({ success: false, message: "Internal server error", error });
    }
};

const sendMessage = async (req, res) => {
    try {
        const { content, chatId } = req.body;
        if(!content || !chatId){
            return res.json({ success: false, message: 'Invalid data passed into request.', error });
        }
        var newMessage = await Message.create({
            sender: req.user._id,
            content: content,
            chat: chatId,
        });
        newMessage = await newMessage.populate("sender", "username photo");
        newMessage = await newMessage.populate("chat");
        newMessage = await User.populate(newMessage, {
            path: 'chat.users',
            select: 'username photo email',
        });
        await Chat.findByIdAndUpdate(chatId, { latestMessage: newMessage });
        res.json({ success: true, message: newMessage });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Internal server error", error });
    }
};

export { getMessages, sendMessage };
