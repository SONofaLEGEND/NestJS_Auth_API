import {Injectable} from '@nestjs/common';
import {sign} from 'jsonwebtoken';
import {UserService} from 'src/shared/user.service';


@Injectable()

export class AuthService {
    constructor(private userService:UserService){}

    async signPayload(payload:any){
        let token = sign(payload, 'secretkey');
        return token;
    }
    async validateUser(payload:any){
        return await this.userService.findByPayload(payload);
    }
}
