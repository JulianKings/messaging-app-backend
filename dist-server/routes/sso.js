"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _express = _interopRequireDefault(require("express"));
var _ssoController = _interopRequireDefault(require("../controllers/ssoController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _default(passport) {
  var router = _express["default"].Router();
  var controller = (0, _ssoController["default"])(passport);
  router.get('/', controller.sso_check);
  router.get('/community', controller.get_communities);
  router.get('/friends', controller.get_friends);
  router.post('/add_community', controller.post_community);
  return router;
}