import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    }],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: []
        }
    ]
})

const Conversation = mongoose.model("Conversation", ConversationSchema);

export default Conversation;