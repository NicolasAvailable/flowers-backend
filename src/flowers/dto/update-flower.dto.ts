import { PartialType } from '@nestjs/swagger';
import { CreateFlowerDto } from './create-flower.dto';
import { Images } from '../interfaces/flower.interface';

export class UpdateFlowerDto extends PartialType(CreateFlowerDto) {
    name?: string;
    country?: string;
    gender?: number;
    images?: Images[];
    temperature?: number;
    origin?: number;
}
