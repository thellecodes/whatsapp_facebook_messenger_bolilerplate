const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatsSchema = new Schema({
  time: { type: String, default: Date.now },
  recieverEmail: { type: String },
  senderEmail: { type: String },
  roomID: { type: String, required: true },
});

module.exports = Chats = mongoose.model("chats", ChatsSchema);
