import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from 'express-validator';

import jwt from 'jsonwebtoken';

export default function(passport) {
    return {
        post_login: [
            // Validate and sanitize fields.
            body("username", "User name must not be empty.")
                .trim()
                .isLength({ min: 1 })
                .escape(),
            body("password", "Password must not be empty.")
                .trim()
                .isLength({ min: 1 })
                .escape(),    
        
            expressAsyncHandler(async (req, res, next) => {
                const errors = validationResult(req);

                if(!errors.isEmpty())
                {
                    // send response with errors
                    const responseObject = {
                        responseStatus: 'invalidLogin',
                        errors: errors.array()
                    }
                    return res.json(responseObject);
                } else {
                    passport.authenticate(
                    'login',
                    async (err, user, info) => {
                        try {
                            if (err) {
                                const error = new Error('An error occurred.');
                                console.error(err);
                    
                                return next(error);
                            }

                            if(user === false)
                            {
                                // send response with errors
                                const responseObject = {
                                    responseStatus: 'failedLogin',
                                    errors: [info]
                                }
                                return res.json(responseObject);
                            }
                    
                            req.login(
                                user,
                                { session: false },
                                async (error) => {
                                if (error) return next(error);
                    
                                const body = { _id: user._id, username: user.username, role: user.membership_role };
                                const token = jwt.sign({ user: body }, req.app.settings.jwt_secret_password, { expiresIn: '2h' });
                    
                                return res.json({ responseStatus: 'validLogin', token: token });
                                }
                            );
                        } catch (error) {
                            return next(error);
                        }
                    }
                    )(req, res, next);
                }
            })
        ],
        get_guest: expressAsyncHandler(async (req, res, next) => {
            const user = {};
            const nextId = req.app.settings.next_guest_id - 1;
            req.app.set('next_guest_id', nextId);
            user._id = (nextId);
            user.username = 'Guest'
            user.membership_role = 'guest';
            user.profile_picture = '',

            req.login(
                user,
                { session: false },
                async (error) => {
                if (error) return next(error);
    
                const body = { _id: user._id, username: user.username, role: user.membership_role, picture: user.profile_picture };
                const token = jwt.sign({ user: body }, req.app.settings.jwt_secret_password, { expiresIn: '2h' });
    
                return res.json({ responseStatus: 'validLogin', token: token });
                }
            );
        })
    }
}