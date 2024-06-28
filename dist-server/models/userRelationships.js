"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Schema = _mongoose["default"].Schema;
var userRelationshipSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  friend: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  relationship: {
    type: String,
    required: true
  }
});
var relationshipModel = _mongoose["default"].model("user_relationship", userRelationshipSchema);
var _default = exports["default"] = relationshipModel;