import { Schema } from "mongoose";
import { User } from '../interfaces/user.interface'


export const UserSchema = new Schema<User>({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    createAt: {type: Date, default: Date.now}
})