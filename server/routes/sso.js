import express from 'express';
import ssoController from '../controllers/ssoController';

export default function(passport) {
    var router = express.Router();

    const controller = ssoController(passport);
    router.get('/', controller.sso_check);
    router.get('/community', controller.get_communities);
    router.get('/friends', controller.get_friends);
    return router;
}