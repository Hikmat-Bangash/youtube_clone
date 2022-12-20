
import { Request, Response } from "express";
import { Types } from 'mongoose'
import User from "../model/user.schema";
import { IUser } from "../@types/Users.types";


// ---------------------- Creating User --------------------
export const CreateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: IUser & {
            _id: Types.ObjectId;
        } = await User.create(req.body)
        
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error)
    }
}
//----------------------- Getting all users -----------------------
export const GettingUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: (IUser & {
            _id: Types.ObjectId;
        })[] = await User.find();
        res.status(200).json(users)
    }
    catch (error) {
        res.status(500).json(error)
    }
}

// ---------------------- Getting a single user --------------------

export const GetSingleUser = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;

    try {
        const user: (IUser & {
            _id: Types.ObjectId;
        } | null) = await User.findById(id);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}

//------------------------ Updatae an user -------------------
export const UpdateUser = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const updateUser: (IUser & {
            _id: Types.ObjectId;
        }) | null = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })

        res.status(200).json(updateUser);

    } catch (err) {
        res.status(500).json({ status: "404", error: err, message: "Something is wrong while updating the user info" });
    }
}

//---------------------- Deleting a user ----------------------
export const deleteUser = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ status: "200", message: "User deleted successfull" });
    } catch (error) {
        res.status(200).json({ status: "200", message: "User deleted successfull" });
    }
}

