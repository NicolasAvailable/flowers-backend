import { Module } from '@nestjs/common';
import { FlowersService } from './services/flowers.service';
import { FlowersController } from './controller/flowers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FlowerSchema } from './schema/flower.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'flowers',
        schema: FlowerSchema
      }
    ])
  ],
  controllers: [FlowersController],
  providers: [FlowersService],
})
export class FlowersModule {}
