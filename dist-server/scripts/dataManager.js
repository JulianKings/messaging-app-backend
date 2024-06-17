"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNextGuestId = void 0;
var uniqueGuestId = 0;
var getNextGuestId = exports.getNextGuestId = function getNextGuestId() {
  return ++uniqueGuestId;
};