"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _communityController = require("../controllers/communityController");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.get('/popular', _communityController.get_popular_communities);
router.get('/latest', _communityController.get_latest_communities);
var _default = exports["default"] = router;