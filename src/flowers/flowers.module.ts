import { Module } from '@nestjs/common';
import { FlowersService } from './services/flowers.service';
import { FlowersController } from './controller/flowers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FlowerSchema } from './schema/flower.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'flowers',
        schema: FlowerSchema
      }
    ]),
    CloudinaryModule
  ],
  controllers: [FlowersController],
  providers: [FlowersService],
})
export class FlowersModule {}
