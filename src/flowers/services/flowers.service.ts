import { ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlowerDto } from '../dto/create-flower.dto';
import { UpdateFlowerDto } from '../dto/update-flower.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flower } from '../interfaces/flower.interface';

@Injectable()
export class FlowersService {

  constructor(@InjectModel('flowers') private readonly flowerModel: Model<Flower>){}

  public async create(createFlowerDto: CreateFlowerDto) {
    const newFlower = new this.flowerModel(createFlowerDto);
    return await newFlower.save();
  }

  public findAll() {
    return this.flowerModel.find({});
  }

  public findOne(id: string) {
    return this.flowerModel.findOne({_id: id});
  }

  public async update(id: string, updateFlowerDto: UpdateFlowerDto) {
    if(this.validateObjectEmpty(updateFlowerDto)){
      throw new ConflictException('The body is required') 
    }
    const flowerFound = await this.findOne(id);
    if(!flowerFound) throw new NotFoundException();
    return this.flowerModel.findByIdAndUpdate(id, updateFlowerDto, { new: true });
  }

  public async remove(id: string) {
    const flowerFound = await this.findOne(id);
    if(!flowerFound) throw new NotFoundException();
    console.log("🚀 ~ file: flowers.service.ts:40 ~ FlowersService ~ remove ~ flowerFound:", flowerFound);
    await this.flowerModel.deleteOne({ _id: id })

    const successfulResponse = {
      message: 'Flowers deleted successfully',
      statusCode: HttpStatus.NO_CONTENT,
    };
    return successfulResponse
  }

  private validateObjectEmpty(obj: any){
    return JSON.stringify(obj) === JSON.stringify({});
  }
}
