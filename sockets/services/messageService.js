// const { default: mongoose } = require("mongoose");
// const ChatRoom = require("../../chatRooms/models/mongodb/ChatRoom");
// const Message = require("../../message/models/mongodb/Message");

// const sendMessageToChatRoom = async (roomId, senderId, content) => {
//     const room = await ChatRoom.findById(roomId);
//     if (!room) throw new Error('Chat room not found');

//     const roomIdObjectId = mongoose.Types.ObjectId(roomId); // אם ה-roomId שלך הוא מחרוזת עם prefix

//     const newMessage = new Message({
//         chatRoom: roomIdObjectId,  // כאן אתה שומר את ה-ObjectId של החדר
//         content: content,
//         sender: senderId,
//         timestamp: new Date().toISOString()
//     });

//     await newMessage.save()
//         .then(() => {
//             console.log("Message saved successfully");
//         })
//         .catch((err) => {
//             console.log("Error saving message:", err);
//         });

//     room.lastMessage = newMessage._id;
//     room.updatedAt = new Date();
//     await room.save();

//     return newMessage;
// };


// module.exports = { sendMessageToChatRoom };
