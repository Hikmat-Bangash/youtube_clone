import { Request, Response, NextFunction } from "express";
import { createError } from "../HandleError.js";
import CommentModel from "../model/comment.schema.js";
import VideoModel from "../model/video.schema.js";
import { IComment } from "../@types/Comment.types.js";


export const addComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const newComment = new CommentModel({ ...req.body, userId: req.user.id });
    try {
        const savedComment = await newComment.save();
        res.status(200).send(savedComment);
    } catch (err) {
        next(err);
    }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const comment = await CommentModel.findById(req.params.id);
        const video = await VideoModel.findById(req.params.id);

        if (req.user.id === comment?.userId || req.user.id === video?.userId) {
            await CommentModel.findByIdAndDelete(req.params.id);
            res.status(200).json("The comment has been deleted.");
        } else {
            return next(createError(403, "You can delete ony your comment!"));
        }
    } catch (err) {
        next(err);
    }
};

export const getComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const comments = await CommentModel.find({ videoId: req.params.videoId });
        res.status(200).json(comments);
    } catch (err) {
        next(err);
    }
};

