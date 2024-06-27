import userModel from "../models/user";

import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from 'express-validator';

import bcrypt from 'bcryptjs';

const post_signup = [
    // Validate and sanitize fields.
    body("userName", "User name must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .isLength({ min: 3 })
        .withMessage('User name must have at least 3 characters.')
        .isLength({ max: 36 })
        .withMessage('User name cannot be longer than 36 characters.')
        .custom(async value => {
            const user = await userModel.findOne({ username: value });
            if(user) {
                throw new Error('User name already in use')
            }
        }),
    body("email", "Email must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .isLength({ min: 3 })
    .withMessage('Email must have at least 3 characters.')
    .custom(async value => {
        const user = await userModel.findOne({ email: value });
        if(user) {
            throw new Error('Email already in use')
        }
    }),
    body("password", "Password must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .isLength({ min: 3 })
        .withMessage('Password must be longer than 3 characters.')
        .isLength({ max: 32 })
        .withMessage('Password cannot be longer than 32 characters.'),
    body("firstName", "User first name must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .isLength({ min: 3 })
        .withMessage('User first name must be longer than 3 characters.')
        .isLength({ max: 48 })
        .withMessage('User first name cannot be longer than 48 characters.'),
    body("lastName", "User last name must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .isLength({ min: 3 })
        .withMessage('User last name must be longer than 3 characters.')
        .isLength({ max: 48 })
        .withMessage('User last name cannot be longer than 48 characters.'),
    body("confirmPassword", "Confirm password must not be empty.")
        .trim()
        .isLength({min: 1})
        .escape()
        .custom((value, { req }) => {
            return (value === req.body.password);
        })
        .withMessage('Password must match confirm password.'),    

    expressAsyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const user = new userModel({
            username: req.body.userName,
            password: req.body.password,
            email: req.body.email,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            membership_role: 'user',
            profile_picture: 'none',
            timestamp: (new Date()),
            is_banned: false,
            last_connection: (new Date())
        })

        if(!errors.isEmpty())
        {
            // send response with errors
            const responseObject = {
                responseStatus: 'invalidSignup',
                errors: errors.array()
            }
            res.json(responseObject);
        } else {
            bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                if(err)
                {
                    err.status = 404;
                    return next(err);
                }
    
                user.password = hashedPassword;
                const result = await user.save();
                // send successful response
                const responseObject = {
                    responseStatus: 'validSignup'
                }
                res.json(responseObject);
            });
        }
    }),
];

export { post_signup }