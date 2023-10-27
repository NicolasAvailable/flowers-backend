import { Schema } from "mongoose";
import { Flower } from "../interfaces/flower.interface";


export const FlowerSchema = new Schema<Flower>({
    name: {type: String, required: true, unique: false},
    gender: {type: String, required: true},
    specie: {type: String},
    country: {type: String},
    altitudinalFloor: {type: String},
    images: {type: [String]},
    createAt: {type: Date, default: Date.now}
})