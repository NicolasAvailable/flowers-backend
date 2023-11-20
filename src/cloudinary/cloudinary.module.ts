import { Module } from '@nestjs/common';
import { CloudinaryService } from './services/cloudinary.service';
import { CloudinaryProvider } from './provider/cloudinary.provider';

@Module({
    providers: [CloudinaryService, CloudinaryProvider]
})
export class CloudinaryModule {}
