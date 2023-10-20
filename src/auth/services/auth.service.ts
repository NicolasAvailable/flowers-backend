import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/interfaces/user.interface';
import { UserService } from 'src/users/services/user.service';

@Injectable()
export class AuthService {

    constructor(
        public userService: UserService,
        private jwtService: JwtService
    ){}

    public async validateUser(username: string, password: string){
        const user = await this.userService.findUserByUsername(username);

        if(!user || user.password !== password) return null
       
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
