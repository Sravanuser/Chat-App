import Conversation from "../Model/ConversationModel.js";
import Message from "../Model/MessageModel.js";
import { getRecieverSocketId,io } from "../Socket/Socket.js";

export const SendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: recieverId } = req.params;
        const { _id: senderId } = req.id;
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] }
        });
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId]
            });
        }

        const newMessage = new Message({
            senderId, recieverId, message
        });
        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }
        await Promise.all([conversation.save(), newMessage.save()]);
        const recieverSocketId = getRecieverSocketId(recieverId);
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage",newMessage)
        }
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}

export const GetMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const { _id: senderId } = req.id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");
        if (!conversation) return res.status(200).json([]);
        const messages = conversation.messages;
        res.status(201).json({ messages });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}