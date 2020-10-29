"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatUserList = void 0;

var _socket = _interopRequireDefault(require("socket.io-client"));

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//** Socket Config */
var socket = (0, _socket["default"])("".concat(_types.API_URI), {
  forceNew: true
});
socket.on('connection', function () {
  return console.log('Connection');
});

var ChatUserList = function ChatUserList() {
  return function _callee(dispatch, getState) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            socket.emit('getUsers');

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};

exports.ChatUserList = ChatUserList;