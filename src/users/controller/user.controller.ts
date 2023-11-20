import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user.interface';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {

    constructor(private userService: UserService){}

    @Get()
    public getAllUsers(){
        return this.userService.getAllUsers();
    }

    @Get(':id')
    public findUser(@Param('id')id: string){
        return this.userService.finUserById(id);
    }

    @Post()
    public async createUser(@Body() user: User): Promise<User>{
        return await this.userService.createUser(user);
    }

    @Patch(':id')
    public async updateUser(@Param('id')id: string, @Body() user: UpdateUserDto): Promise<User>{
        return await this.userService.updateUser(id, user);
    }

    @Delete(':id')
    public deleteUser(@Param('id')id: string){
        return this.userService.deleteUser(id);
    }
}
