import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const message = req.body.message;
    const receiverId = req.params.userId;
    // 'user' comes from the middle ware
    const senderId = req.user._id;

    let chat = await Chat.findOne({
      // Find chat where chatMembers array includes senderId und receiverId
      chatMembers: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      chat = await Chat.create({
        chatMembers: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      chat.messages.push(newMessage._id);
    }

    await Promise.all([chat.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in send create message controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const chatUserId = req.params.userId;
    const userId = req.user._id;
    // If more than one identical chats in database it will only return the first document
    const chat = await Chat.findOne({
      chatMembers: { $all: [chatUserId, userId] },
    }).populate("messages");
    // Populate: Like a join. Replaces refferenced id with actual document

    if (!chat) {
      return res.status(200).json([]);
    }
    return res.status(200).json(chat.messages);
  } catch (error) {
    console.log("Error in send get message controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
