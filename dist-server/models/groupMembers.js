"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Schema = _mongoose["default"].Schema;
var groupMemberSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: "group",
    required: true
  },
  role: {
    type: String,
    required: true
  }
});
var memberModel = _mongoose["default"].model("group_member", groupMemberSchema);
var _default = exports["default"] = memberModel;