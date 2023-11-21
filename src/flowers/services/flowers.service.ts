import {  
  ConflictException, 
  Injectable, 
  NotFoundException, 
  FileTypeValidator, 
  HttpStatus, 
  MaxFileSizeValidator, 
  ParseFilePipe, 
  UploadedFile, 
  UseInterceptors 
} from '@nestjs/common';
import { CreateFlowerDto } from '../dto/create-flower.dto';
import { UpdateFlowerDto } from '../dto/update-flower.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flower } from '../interfaces/flower.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary.service';

@Injectable()
export class FlowersService {

  constructor(
    @InjectModel('flowers') private readonly flowerModel: Model<Flower>,
    private readonly cloudinaryService: CloudinaryService
    ){}

  public async create(createFlowerDto: CreateFlowerDto) {
    const newFlower = new this.flowerModel(createFlowerDto);
    return await newFlower.save();
  }

  public createFlower(createFlowerDto: CreateFlowerDto){
    if(createFlowerDto?.images){
      createFlowerDto?.images?.forEach( async (img: string) => {
        try {
          const {url} = await this.uploadImage(img);
          createFlowerDto.images.shift();
          console.log("🚀 ~ file: flowers.service.ts:32 ~ FlowersService ~ createFlowerDto?.images?.forEach ~ url:", url)
          createFlowerDto.images.push(url);      
          this.create(createFlowerDto);
        } catch (error) {
          console.log(error);
        }
      })
    } else {
      this.create(createFlowerDto);
    }
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

  @UseInterceptors(FileInterceptor('file'))
  uploadImage( 
   file: string
  ){
    return this.cloudinaryService.uploadFile(file)
  }

  // @UseInterceptors(FileInterceptor('file'))
  // uploadImage( 
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new MaxFileSizeValidator({maxSize: 1024 * 1024 * 4}),
  //         new FileTypeValidator({fileType: '.(png|jpeg|jpg)'})
  //       ]
  //     })
  //   ) file: string
  // ){
  //   return this.cloudinaryService.uploadFile(file)
  // }
}
