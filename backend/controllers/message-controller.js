import Message from "../models/message-model.js";

const getMessages = async (req, res) => {
    const { room } = req.params;
    try {
        const messages = await Message.find({ room }).sort({ createdAt: 1 }).limit(50);
        if (messages) res.json({ success: true, messages });
        res.json({ success: false, message: 'Messages not found.' });
    } catch (error) {
        res.json({ success: false, message: 'Failed to get messages.', error });
    }
};

export { getMessages };