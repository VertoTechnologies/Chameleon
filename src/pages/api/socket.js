import { Server } from "socket.io";
import dbConnect from '../../middleware/mongodb';
import Chat from "../../models/Chat";
import GroupMessage from "../../models/GroupMessage";
import User from '../../models/user';

const ioHandler = async (req, res) => {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.IO...");
    const io = new Server(res.socket.server, {
      path: "/api/socket",
    });

    io.on("connection", (socket) => {
      console.log("New client connected");

      socket.on("joinRoom", async (chatId) => {
        socket.join(chatId);
        console.log(`Client joined room: ${chatId}`);

        await dbConnect();
        try {
          const messages = await GroupMessage.find({ Chat: chatId });
          const messageWithSenders = await Promise.all(messages.map(async (message) => {
            const sender = await User.findById(message.sender);
            return {
              ...message.toObject(),
              sender: {
                userId: sender.userId,
                name: sender.name,
                _id: sender._id,  // Ensure _id is included
                photo: sender.photo // Ensure photo is included
              }
            };
          }));
          socket.emit("previousMessages", messageWithSenders);
        } catch (error) {
          console.error("Error fetching previous messages:", error);
          socket.emit("error", { message: "Error fetching previous messages" });
        }
      });

      socket.on("sendMessage", async ({ chatId, userId, text, photo }) => {
        await dbConnect();

        try {
          const chat = await Chat.findById(chatId);
          if (!chat) {
            socket.emit("error", { message: "Chat not found" });
            return;
          }

          const sender = await User.findById(userId);
          if (!sender) {
            socket.emit("error", { message: "Sender not found" });
            return;
          }
          console.log("sender", sender);

          const newMessage = new GroupMessage({
            Chat: chat._id,
            sender: sender._id,
            text,
            photo,
          });

          await newMessage.save();
          const populatedMessage = await newMessage.populate("sender", "name userId _id");

          io.in(chatId).emit("receiveMessage", {
            ...populatedMessage.toObject(),
            sender: {
              userId: sender.userId,
              name: sender.name,
              _id: sender._id,
              photo: sender.photo
            }
          });
        } catch (error) {
          console.error("Error sending message:", error);
          socket.emit("error", { message: "Error sending message" });
        }
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("Socket.IO already initialized");
  }
  res.end();
};

export default ioHandler;
