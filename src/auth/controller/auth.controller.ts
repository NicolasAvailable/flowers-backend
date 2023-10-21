import { Controller, Post, UseGuards, Request} from '@nestjs/common';
import { LocalAuthGuard } from '../local-auth.guard';
import { AuthService } from '../services/auth.service';
// import { ApiTags } from '@nestjs/swagger';

// @ApiTags('auth')

@Controller('auth/login')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @UseGuards(LocalAuthGuard)
    @Post()
    async login(@Request() req){
        return this.authService.login(req.user);
    }

}
