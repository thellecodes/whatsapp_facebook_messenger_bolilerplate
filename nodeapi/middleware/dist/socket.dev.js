"use strict";

var uuid = require("uuid"); //* User Schema *//


var User = require("../schema/User");

module.exports = function (app, io, db) {
  io.on("connection", function (socket) {
    // "6YDAM1LVauUWTnQoAAAC",
    User.find({}, function () {
      console.log("users");
    });
    socket.on("getUsers", function () {});
  });
};