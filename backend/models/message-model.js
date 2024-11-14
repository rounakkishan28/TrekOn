import { Schema, model} from "mongoose";

const messageSchema = new Schema({
    room: { type: String, required: true },
    sender: { type: String, required: true },
    content: { type: String, required: true },
}, { timestamps: true });

const Message = model('Message', messageSchema);

export default Message;
