import express from 'express';
import { get_latest_communities, get_popular_communities } from '../controllers/communityController';

var router = express.Router();

router.get('/popular', get_popular_communities);
router.get('/latest', get_latest_communities);

export default router;