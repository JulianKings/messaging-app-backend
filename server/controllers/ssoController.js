import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from 'express-validator';
import userModel from "../models/user";
import memberModel from "../models/groupMembers";
import relationshipModel from "../models/userRelationships";

export default function(passport) {
    return {
        sso_check: expressAsyncHandler(async (req, res, next) => {
            res.json({
                user: req.user
              })
        }),

        get_communities: expressAsyncHandler(async (req, res, next) => {
            const myCommunities = await memberModel.find({ user: req.user._id }).populate("group")
                .exec();

            const responseObject = {
                responseStatus: 'validRequest',
                communities: myCommunities
            }

            res.json(responseObject);
        }),

        get_communities: expressAsyncHandler(async (req, res, next) => {
            const myCommunities = await memberModel.find({ user: req.user._id }).populate("group")
                .exec();

            const responseObject = {
                responseStatus: 'validRequest',
                communities: myCommunities
            }

            res.json(responseObject);
        }),

        get_friends: expressAsyncHandler(async (req, res, next) => {
            const myFriends = await relationshipModel.find({ user: req.user._id, relationship: 'friend' }).populate("friend")
                .exec();

            const responseObject = {
                responseStatus: 'validRequest',
                friends: myFriends
            }

            res.json(responseObject);
        }),
    }
}