import { Document } from "mongoose";

export interface Flower extends Document{
    name: string;
    gender: number;
    specie: string;
    origin: number;
    country: string;
    altitudinalFloor?: number;
    images: string[];
    createAt: Date;
}
