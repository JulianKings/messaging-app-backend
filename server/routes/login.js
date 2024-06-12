import express from 'express';
import loginController from '../controllers/loginController';

export default function(passport) {
    var router = express.Router();

    const controller = loginController(passport);
    router.post('/', controller.post_login);
    return router;
}