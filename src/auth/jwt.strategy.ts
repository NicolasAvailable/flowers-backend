import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy} from "passport-jwt";
import { jwtConstant } from "./constants";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpliration: false,
            secretOrKey: jwtConstant.secret
        })
    }

    public validate(payload: any){
        return {
            id: payload.id,
            userId: payload.sub, 
            username: payload.username
        }
    }
}