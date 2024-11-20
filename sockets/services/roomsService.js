// const ChatRoom = require("../../chatRooms/models/mongodb/ChatRoom");
// const Message = require("../../message/models/mongodb/Message");

// const ChatRoom = require("../../chatRooms/models/mongodb/ChatRoom");
// const Message = require("../../message/models/mongodb/Message");

// const getMessagesFromChatRoom = async (roomId) => {
//     try {
//         const messages = await Message.find({ chatRoom: roomId })
//             .populate('sender')
//             .select('-__v');
//         return messages;
//     } catch (error) {
//         throw new Error('Error fetching messages from chat room: ' + error.message);
//     }
// };


// const createChatRoom = async (roomId) => {
//     const existingRoom = await ChatRoom.findOne({ _id: mongoose.Types.ObjectId(roomId) }); // המרת ה-roomId ל-ObjectId
//     if (existingRoom) {
//         throw new Error('Room already exists');
//     }

//     const newRoom = new ChatRoom({
//         _id: roomId,
//         lastMessage: null,
//         updatedAt: new Date()
//     });

//     await newRoom.save();
//     console.log("Chat room created successfully:", newRoom);
//     return newRoom;
// };





// module.exports = { createChatRoom, getMessagesFromChatRoom };
