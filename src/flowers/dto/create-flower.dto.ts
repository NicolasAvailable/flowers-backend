import { Flower } from '../entities/flower.entity';
import { Images } from '../interfaces/flower.interface';
export class CreateFlowerDto extends Flower {

    name: string;
    gender: number;
    specie: string;
    origin: number;
    country: string;
    altitudinalFloor: string;
    temperature: number;
    images: Images[];
    createAt: Date;
}
