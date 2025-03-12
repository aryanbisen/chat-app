import { Error } from "mongoose";
import Chat from "../models/chatModel.js";
import User from "../models/userModel.js"; // Make sure to import the User model if needed

export const getUsers = async (req, res) => {
  try {
    const ownUserId = req.user._id;

    const allChats = await Chat.find({
      chatMembers: { $elemMatch: { $eq: ownUserId } },
    }).populate("chatMembers", "-password");

    const contacts = [];
    for (let i = 0; i < allChats.length; i++) {
      allChats[i].chatMembers.forEach((member) => {
        if (
          // Validation for chats with mulitple users so
          member._id.toString() !== ownUserId.toString() // && !contacts.some((contact) => contact._id.toString() === member._id.toString())
        ) {
          contacts.push(member);
        }
      });
    }

    return res.status(200).json(contacts);
  } catch (error) {
    console.log("Error in getUsers controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFriends = async (req, res) => {
  try {
    const ownUserId = req.user._id;
    const ownUser = await User.findById(ownUserId);

    return res.status(200).json(ownUser.friends)

  } catch (error) {
    console.log("Error in get friends controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addUser = async (req, res) => {
  try {
    const receiverEmailOrUsername = req.params.receiver;
    const senderId = req.user._id;
    const sender = req.user;
    const receiver = await User.findOne({
      $or: [
        { email: receiverEmailOrUsername },
        { userName: receiverEmailOrUsername },
      ],
    });

    if (!receiver) {
      return res.status(404).json({ error: "Receiver does not exist." });
    }

    if (receiver.friendRequests.includes(senderId)) {
      return res.status(409).json({ error: "Friend request already sent." });
    }

    if (receiver.friends.includes(senderId)) {
      return res
        .status(400)
        .json({ error: `${receiver.userName} is already your friend.` });
    }
    if (receiver._id.equals(senderId)) {
      return res.status(400).json({ error: "You cannot add yourself." });
    }

    if (sender.friendRequests.includes(receiver._id)) {
      return res.status(400).json({
        error: `${receiver.userName} has already sent you a friend request. Check your friend requests!`,
      });
    }
    receiver.friendRequests.push(senderId);
    receiver.alerts.push({
      message: `${sender.firstName} ${sender.lastName} sent you a friend request.`,
    });
    await receiver.save();
    await sender.save();

    return res.status(201).json({ message: "Sent friend request" });
  } catch (error) {
    console.error("Error in addUser controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
    const ownUserId = req.user._id;

    // populate: fetches the fields of the coresponding document
    const user = await User.findById(ownUserId).populate(
      "friendRequests",
      "firstName lastName email userName"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract the necessary information from the populated friendRequests
    const friendRequests = user.friendRequests.map((requester) => ({
      _id: requester._id,
      firstName: requester.firstName,
      lastName: requester.lastName,
      email: requester.email,
      userName: requester.userName,
    }));

    // Send the response with the list of friend requests
    return res.status(200).json(friendRequests);
  } catch (error) {
    console.log("Error in getFriendRequest controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSentRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const sentRequestUsers = await User.find({ friendRequests: userId });
    const sentRequests = sentRequestUsers.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userName: user.userName,
    }));

    return res.status(200).json(sentRequests);
  } catch (error) {
    console.log("Error in getSentRequests controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const manageFriendRequest = async (req, res) => {
  try {
    const ownUserId = req.user._id;
    const ownUser = req.user;
    const friendUserId = req.params.friendUserId;
    const friendUser = await User.findById(friendUserId);
    const { manager } = req.body;

    if (!friendUser) {
      res.status(404).json({ error: "User not found" });
    }
    const index = ownUser.friendRequests.indexOf(friendUserId);

    if (index === -1) {
      return res.status(400).json({
        error: `${friendUser.userName} hasn't sent you a friend request`,
      });
    }

    if (ownUser.friends.includes(friendUserId)) {
      return res
        .status(409)
        .json({ error: `${friendUser.userName} is already your friend.` });
    }
    if (index > -1) {
      ownUser.friendRequests.splice(index, 1);
    }
    if (manager) {
      friendUser.friends.push(ownUserId);
      ownUser.friends.push(friendUserId);
      await ownUser.save();
      await friendUser.save();
      return res.status(201).json({ message: "Request successfully accepted" });
    } else {
      await ownUser.save();
      return res.status(201).json({ message: "Request successfully denied" });
    }
  } catch (error) {
    console.log("Error in manageFriendRequest controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {};
