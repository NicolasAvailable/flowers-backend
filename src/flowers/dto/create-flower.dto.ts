import { Flower } from '../entities/flower.entity';
export class CreateFlowerDto extends Flower {

    name: string;
    gender: number;
    specie: string;
    origin: number;
    country: string;
    altitudinalFloor: string;
    temperature: number;
    images: string[];
    createAt: Date;
}
