import { Date, Document } from "mongoose";

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    createAt?: Date
}