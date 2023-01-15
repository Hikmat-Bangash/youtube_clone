
import { Request, Response } from "express";
import User from "../model/user.schema";
import { Types } from "mongoose";
import bcrypt from 'bcryptjs'
import { createError } from "../HandleError";
import jwt from "jsonwebtoken";
import { IUser } from "../@types/Users.types";

export const signup = async (req: Request, res: Response, next: any) => {
    try {
        const salt: string = bcrypt.genSaltSync(10);
        const hash: string = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({ ...req.body, password: hash });

        await newUser.save();
        res.status(200).send("User has been created!");
    } catch (err) {
        next(err);
    }
};

// sign in user
export const signin = async (req: Request, res: Response, next: any) => {
    console.log(req.body)
    try {
       
        const user: IUser & {
            _id: Types.ObjectId;
            _doc: any;
        }| null = await User.findOne({ name: req.body.name });
          
        if (!user) return next(createError(404, "User not found!"));
          
        console.log("user saved password in db: " + user.password);
        console.log("req.body password: " + req.body.password);
        const isCorrect: boolean = await bcrypt.compare(req.body.password, user.password);
        
        if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

        const token = jwt.sign({ id: user._id }, "HIKMATKHANBANGASH");
        const { password, ...others } = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json(others);
    } catch (err) {
        next(err);
    }
};



// export const googleAuth = async (req, res, next) => {
//     try {
//         const user = await User.findOne({ email: req.body.email });
//         if (user) {
//             const token = jwt.sign({ id: user._id }, process.env.JWT);
//             res
//                 .cookie("access_token", token, {
//                     httpOnly: true,
//                 })
//                 .status(200)
//                 .json(user._doc);
//         } else {
//             const newUser = new User({
//                 ...req.body,
//                 fromGoogle: true,
//             });
//             const savedUser = await newUser.save();
//             const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
//             res
//                 .cookie("access_token", token, {
//                     httpOnly: true,
//                 })
//                 .status(200)
//                 .json(savedUser._doc);
//         }
//     } catch (err) {
//         next(err);
//     }
// };
