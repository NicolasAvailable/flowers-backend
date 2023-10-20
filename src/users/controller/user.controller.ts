import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {

    constructor(private userService: UserService){}

    @Get(':id')
    public findUser(@Param('id')id: string){
        return this.userService.finUserById(id);
    }

    @Post()
    public async createUser(@Body() user: User): Promise<User>{
        return await this.userService.createUser(user);
    }

}
