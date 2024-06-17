import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from 'express-validator';
import userModel from "../models/user";

export default function(passport) {
    return {
        sso_check: expressAsyncHandler(async (req, res, next) => {
            res.json({
                user: req.user
              })
        }),
    }
}