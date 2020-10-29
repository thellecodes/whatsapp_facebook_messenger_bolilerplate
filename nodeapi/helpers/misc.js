const Chats = require("../schema/Chats");
const { v4: uuidV4 } = require("uuid");
const Messages = require("../schema/Messages");

const addUser = ({ recieverEmail, senderEmail }, socket) => {
  if (!recieverEmail || !senderEmail)
    return { error: "You tried to add zero uses" };

  const user = { recieverEmail, senderEmail };

  //   if there is a recieverEmail of same and my email is the senderEmail
  Chats.aggregate([
    {
      $match: {
        recieverEmail,
        senderEmail,
      },
    },
  ]).then((chat) => {
    if (chat.length > 0) {
      socket.emit("openChat", { ...chat[0] });
    } else {
      Chats.aggregate([
        {
          $match: {
            recieverEmail: senderEmail,
            senderEmail: recieverEmail,
          },
        },
      ]).then((lastAttempt) => {
        if (lastAttempt.length > 0) {
          socket.emit("openChat", { ...lastAttempt[0] });
        } else {
          const newChat = {
            ...user,
            roomID: uuidV4(),
          };
          socket.emit("openChat", newChat);
          // Create new Chat
          new Chats(newChat).save();
        }
      });
    }
  });
};

const loadMessages = (socket) => {
  socket.on("sentMsgs", ({ myEmail }, cb) => {
    Messages.find({ senderEmail: myEmail }).then((msgs) => {
      if (!msgs) return cb(null);
      cb(msgs);
    });
  });

  socket.on("recievedMsgs", ({ myEmail }, cb) => {
    Messages.find({ recieverEmail: myEmail }).then((msgs) => {
      if (!msgs) return cb(null);
      return cb(msgs);
    });
  });
};

module.exports = { addUser, loadMessages };
