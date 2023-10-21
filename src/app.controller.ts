import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('profile')

@Controller()
export class AppController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req){
      return req.user
  }
}
