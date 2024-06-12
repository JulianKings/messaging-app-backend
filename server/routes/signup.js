import express from 'express';
import { post_signup } from '../controllers/signupController';

var router = express.Router();

router.post('/', post_signup);

export default router;