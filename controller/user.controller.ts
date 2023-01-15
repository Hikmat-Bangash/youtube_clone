import { Request, Response } from "express";
import { Types } from 'mongoose'
import User from "../model/user.schema";
import VideoModel from "../model/video.schema";
import { IUser } from "../@types/Users.types";
import { createError } from "../HandleError";
import { IVideo } from "../@types/video.types";

//------------------ updating user -------------
export const update = async (req:Request, res:Response, next:any) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can update only your account!"));
    }
};

// ---------------- Delete user ------------------
export const deleteUser = async (req: Request, res: Response, next: any) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted successfully.");
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can delete only your account!"));
    }
};

//---------------- getting single users -----------
export const getUser = async (req:Request, res:Response, next:any) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

// --------------- getting all users ---------------
export const getAllUsers = async (req: Request, res: Response, next: any) => {
    try {
        const allUsers: (IUser & {
            _id: Types.ObjectId;
        })[] = await User.find();

        res.status(200).json(allUsers);
        
    } catch (error) {
        next(error);
    }
}

// ---------- subscribe channel -------------
export const subscribe = async (req:Request, res:Response, next:any) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 },
        });
        res.status(200).json("Subscription successfull.")
    } catch (err) {
        next(err);
    }
};

// ----------- unsubscribe the channel ----------
export const unsubscribe = async (req:Request, res:Response, next:any) => {
    try {
        try {
            await User.findByIdAndUpdate(req.user.id, {
                $pull: { subscribedUsers: req.params.id },
            });
            await User.findByIdAndUpdate(req.params.id, {
                $inc: { subscribers: -1 },
            });
            res.status(200).json("Unsubscription successfull.")
        } catch (err) {
            next(err);
        }
    } catch (err) {
        next(err);
    }
};

// ---------- Like video -------------
export const like = async (req:Request, res:Response, next:any) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await VideoModel.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id }
        })
        res.status(200).json("The video has been liked.")
    } catch (err) {
        next(err);
    }
};

// ---------- DISLIKE VIDEO -----------
export const dislike = async (req:Request, res:Response, next:any) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await VideoModel.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }
        })
        res.status(200).json("The video has been disliked.")
    } catch (err) {
        next(err);
    }
};





// ---------------------- Creating User --------------------
// export const CreateUser = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const user: IUser & {
//             _id: Types.ObjectId;
//         } = await User.create(req.body)
        
//         res.status(201).json(user);
//     } catch (error) {
//         res.status(500).json(error)
//     }
// }
// //----------------------- Getting all users -----------------------
// export const GettingUsers = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const users: (IUser & {
//             _id: Types.ObjectId;
//         })[] = await User.find();
//         res.status(200).json(users)
//     }
//     catch (error) {
//         res.status(500).json(error)
//     }
// }
// // ---------------------- Getting a single user --------------------

// export const GetSingleUser = async (req: Request, res: Response): Promise<void> => {
//     const id: string = req.params.id;

//     try {
//         const user: (IUser & {
//             _id: Types.ObjectId;
//         } | null) = await User.findById(id);

//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// }
// //------------------------ Updatae an user -------------------
// export const UpdateUser = async (req: Request, res: Response): Promise<void> => {
//     const id: string = req.params.id;
//     try {
//         const updateUser: (IUser & {
//             _id: Types.ObjectId;
//         }) | null = await User.findByIdAndUpdate(id, {
//             $set: req.body
//         }, { new: true })

//         res.status(200).json(updateUser);

//     } catch (err) {
//         res.status(500).json({ status: "404", error: err, message: "Something is wrong while updating the user info" });
//     }
// }
// //---------------------- Deleting a user ----------------------
// export const deleteUser = async (req: Request, res: Response) => {
//     const id: string = req.params.id;
//     try {
//         await User.findByIdAndDelete(id);
//         res.status(200).json({ status: "200", message: "User deleted successfull" });
//     } catch (error) {
//         res.status(200).json({ status: "200", message: "User deleted successfull" });
//     }
// }

