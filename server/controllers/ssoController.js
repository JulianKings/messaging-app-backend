import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from 'express-validator';
import userModel from "../models/user";
import memberModel from "../models/groupMembers";
import relationshipModel from "../models/userRelationships";
import communityModel from "../models/group";

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

        post_community: [
            // Validate and sanitize fields.
            body("communityName", "Community name must not be empty.")
                .trim()
                .isLength({ min: 1 })
                .escape()
                .isLength({ min: 3 })
                .withMessage('Community name must have at least 3 characters.')
                .isLength({ max: 48 })
                .withMessage('Community name cannot be longer than 48 characters.')
                .custom(async value => {
                    const comm = await communityModel.findOne({ name: value });
                    if(comm) {
                        throw new Error('Community name already in use')
                    }
                }),
            body("communityDescription", "Community description name must not be empty.")
                .trim()
                .isLength({ min: 1 })
                .escape()
                .isLength({ min: 3 })
                .withMessage('Community description must be longer than 3 characters.')
                .isLength({ max: 128 })
                .withMessage('Community description cannot be longer than 128 characters.'),
            body("communityPicture", "Error on community picture.")
                .trim()
                .escape(),
            body("communityStatus", "Community status must not be empty.")
                .trim()
                .isLength({min: 1})
                .escape(),    
        
            expressAsyncHandler(async (req, res, next) => {
                const errors = validationResult(req);
        
                const community = new communityModel({
                    name: req.body.communityName,
                    description: req.body.communityDescription,
                    timestamp: (new Date()),
                    profile_picture: req.body.communityPicture,
                    private: (req.body.communityStatus === 'private')
                })
        
                if(!errors.isEmpty())
                {
                    // send response with errors
                    const responseObject = {
                        responseStatus: 'invalidAppendCommunity',
                        errors: errors.array()
                    }
                    res.json(responseObject);
                } else {
                    const result = await community.save();

                    const owner = new memberModel({
                        user: req.user._id,
                        group: result._id,
                        role: 'owner'
                    })

                    await owner.save();

                    // send successful response
                    const responseObject = {
                        responseStatus: 'validAppendCommunity'
                    }
                    res.json(responseObject);
                }
            }),
        ],
    }
}