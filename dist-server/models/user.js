"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Schema = _mongoose["default"].Schema;
var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  membership_role: {
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
  is_banned: {
    type: Boolean,
    required: true
  }
});
var userModel = _mongoose["default"].model("user", userSchema);
var _default = exports["default"] = userModel;