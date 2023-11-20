import { Document } from "mongoose";

export interface Flower extends Document{
    name: string;
    gender: number;
    specie: string;
    origin: number;
    country: string;
    altitudinalFloor?: number;
    images: Images[];
    createAt: Date;
}

export interface Images{
    img: string
}