import mongoose from "mongoose";
import { IUser } from "../@types/Users.types";


export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    img: { type: String, required: false },
    subscriber: { type: Number, required: false },
    subscribedUsers: { type: String },
    fromGoogle: { type: Boolean}
});

const User = mongoose.model<IUser>('Users', UserSchema);

export default User;


