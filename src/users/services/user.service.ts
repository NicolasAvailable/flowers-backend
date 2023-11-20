import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel('users') private readonly userModel: Model<User> ){}

    public async finUserById(id: string): Promise<User>{
        return await this.userModel.findById(id)
    }

    public getAllUsers(){
        return this.userModel.find({})
    }

    public async createUser(user: CreateUserDto): Promise<User>{

        const {username, password} = user;
        const userExist = await this.findUserByUsername(user.username)
        if(userExist){
            throw new ConflictException('username already exists')
        }
        const salt = await bcrypt.genSalt();
        const newUser = new this.userModel(user);
        newUser.username = username;
        newUser.password = await this.hasPassword(password, salt);
        return await newUser.save();
    }

    public async updateUser(id: string, updateUserDto: UpdateUserDto){

        const userFound = await this.finUserById(id);
        if(!userFound) throw new NotFoundException();

        const salt = await bcrypt.genSalt();
        updateUserDto.password = await this.hasPassword(updateUserDto.password, salt);
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    }

    public async findUserByUsername(username: string): Promise<User>{
        return await this.userModel.findOne({username});
    }

    public async deleteUser(id: string){
        const userToDelete = await this.finUserById(id);
        console.log("🚀 ~ file: user.service.ts:48 ~ UserService ~ deleteUser ~ userToDelete:", userToDelete)
        if(!userToDelete) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

        await this.userModel.deleteOne({ _id: id })

        const successfulResponse = {
            message: 'User deleted successfully',
            statusCode: HttpStatus.NO_CONTENT,
        };
        
        return successfulResponse
    }

    public async hasPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password, salt)
    }

}
