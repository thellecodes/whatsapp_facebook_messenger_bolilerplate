const { addUser, loadMessages } = require("../helpers/misc");
const Messages = require("../schema/Messages");

//* User Schema *//
const User = require("../schema/User");

module.exports = (io) => {
  io.on("connection", function (socket) {
    socket.on("getUsers", () => {
      User.find({}, (err, users) => {
        io.emit("getAllUsers", users);
      });

      loadMessages(socket);

      //* Unique chat *//
      socket.on(
        "startUniqueChat",
        ({ recieverEmail, senderEmail, recieverID }, callback) => {
          addUser({ recieverEmail, senderEmail, recieverID }, socket);
        }
      );

      socket.on("joinTwoUsers", ({ roomID }, cb) => {
        socket.join(roomID);
        cb({ roomID });
      });

      socket.on("sendTouser", (data) => {
        socket.broadcast.to(data.roomID).emit("dispatchMsg", { ...data });
        const {
          roomID,
          senderEmail,
          recieverEmail,
          composeMsg: { time, txtMsg },
        } = data;

        new Messages({
          roomID,
          senderEmail,
          recieverEmail,
          time,
          txtMsg,
        }).save();
      });
    });
  });
};
