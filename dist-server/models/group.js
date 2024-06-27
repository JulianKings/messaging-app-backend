"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Schema = _mongoose["default"].Schema;
var groupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  profile_picture: {
    type: String,
    required: false
  },
  "private": {
    type: Boolean,
    required: true
  }
});
var communityModel = _mongoose["default"].model("group", groupSchema);
var _default = exports["default"] = communityModel;