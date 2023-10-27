import { Injectable } from '@nestjs/common';
import { CreateFlowerDto } from '../dto/create-flower.dto';
import { UpdateFlowerDto } from '../dto/update-flower.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flower } from '../interfaces/flower.interface';

@Injectable()
export class FlowersService {

  constructor(@InjectModel('flowers') private readonly flowerModel: Model<Flower>){}

  public async create(createFlowerDto: CreateFlowerDto) {
    const newFlower = new this.flowerModel(createFlowerDto)
    return await newFlower.save();
  }

  public findAll() {
    return `This action returns all flowers`;
  }

  public findOne(id: number) {
    return `This action returns a #${id} flower`;
  }

  public update(id: number, updateFlowerDto: UpdateFlowerDto) {
    return `This action updates a #${id} flower`;
  }

  public remove(id: number) {
    return `This action removes a #${id} flower`;
  }
}
