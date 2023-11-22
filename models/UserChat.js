import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userInput: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  chatgptResponse: { type: String },
  creationDate: { type: Date, default: Date.now },
});

const Chat = new mongoose.model("Chat", chatSchema);
export default Chat;
