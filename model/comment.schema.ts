import mongoose from "mongoose";
import { IComment } from "../@types/Comment.types";

const CommentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    videoId: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
    }
);
const CommentModel = mongoose.model<IComment>("Comments", CommentSchema);

export default CommentModel;