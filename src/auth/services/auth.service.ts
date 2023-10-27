import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/interfaces/user.interface';
import { UserService } from 'src/users/services/user.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {

    constructor(
        public userService: UserService,
        private jwtService: JwtService
    ){}

    public async validateUser(username: string, password: string){
        const user = await this.userService.findUserByUsername(username);

        if(!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        if(await bcrypt.compare(password, user.password) === false) {
            throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
        }
        
        return user
    }

    public async login(user: User){
        const payload = {
            id: user._id,
            username: user.username, 
            sub: user.id
        };
        
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
