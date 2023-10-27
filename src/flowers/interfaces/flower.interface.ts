import { Document } from "mongoose";

export interface Flower extends Document{
    name: string;
    gender: string;
    specie: string;
    origin: string;
    country: string;
    altitudinalFloor?: string;
    images: Images[];
    createAt: Date;
}

export interface Images{
    img: string
}