import Chat from "../models/chat.js";
import Thread from "../models/thread.js";

export const getChatsByThreadService = async (threadId) => {
  return await Chat.finf({thread: threadId})
  .populate("sender","name email")
  .sort({createdAt: 1 });
};

export const sendChatService = async({
  senderId,
  receiverId,
  message
}) => {

  const thread = await findOrCreateThreadService(senderId,receiverId);
  const chat = await Chat.create({
    thread: thread._id,
    sender: senderId,
    message
  });
  thread.lastMessage = message;
  thread.lastMessage = new Date();
  await thread.save();
  return chat;

}

export const findOrCreateThreadService = async (userId1, userId2)=>{
  const participants = [userId1,userId2].sort();
  let thread = await Thread.findOne({
    participants: {$all:participants},
    $expr:{$eq: [{$size: "$participants"},2]}
  });
  if(!thread){
    thread = await Thread.create({
      participants
    });
  }
  return threads;
}