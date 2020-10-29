"use strict";

var _socket = _interopRequireDefault(require("socket.io-client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/** socket configurations */
var socket = (0, _socket["default"])("".concat(WEBSITE_URL), {
  forceNew: true
});
socket.on('connection', function () {
  return console.log('Connection');
});