import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel('users') private readonly userModel: Model<User> ){}

    public async finUserById(id: string): Promise<User>{
        return await this.userModel.findById(id)
    }

    public async createUser(user: CreateUserDto): Promise<User>{

        const newUser = new this.userModel(user);
        return await newUser.save();
    }

    public async findUserByUsername(username: string): Promise<User>{
        return await this.userModel.findOne({username});
    }

}
