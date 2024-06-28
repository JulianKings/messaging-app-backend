import communityModel from "../models/group";
import memberModel from "../models/groupMembers";
import userModel from "../models/user";

import expressAsyncHandler from "express-async-handler";

const get_popular_communities = expressAsyncHandler(async (req, res, next) => {
    const popularCommunities = await memberModel.aggregate([
        { "$group": {
            "_id": '$group',
            'memberCount': { "$sum": 1 }
        }},

        { "$sort": { "memberCount": -1}},

        { "$limit": 10 }
    ]).exec();

    const builtCommunities = await memberModel.populate(popularCommunities, { path: 'group'});

    const responseObject = {
        responseStatus: 'validRequest',
        communities: builtCommunities
    }

    res.json(responseObject);
});

const get_latest_communities = expressAsyncHandler(async (req, res, next) => {
    const latestCommunities = await communityModel.find({ private: false }).sort({ timestamp: -1}).
        limit(10).exec();

    const responseObject = {
        responseStatus: 'validRequest',
        communities: latestCommunities
    }

    res.json(responseObject);
});

export { get_popular_communities, get_latest_communities }