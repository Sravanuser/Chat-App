import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required:true
    },
    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required:true
    },
    message: {
        type: String,
        required:true
    }
})

const Message = mongoose.model("Message", MessageSchema);

export default Message;
