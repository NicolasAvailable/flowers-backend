import { Controller, Get, UseGuards, Request, Post, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary/services/cloudinary.service';

@ApiTags('profile')

@Controller()
export class AppController {
  constructor(
    private readonly cloudinaryService: CloudinaryService

  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req){
      return req.user
  }

}
