import {Body,Controller,Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoginDTO,RegisterDTO} from './auth.dto';
import {UserService} from 'src/shared/user.service';


@Controller('auth')

export class AuthController {
    constructor(private authService:AuthService, private userService:UserService){}

    @Post('login')
    async login(@Body() userDTO:LoginDTO){
        const user = await this.userService.findByLogin(userDTO);

        const payload = {
            username: user.username,
        }

        const token = await this.authService.signPayload(payload);
        return {
            user, token
        }
    }


    @Post('register')
    async register(@Body() userDTO:RegisterDTO){

        const user = await this.userService.create(userDTO);

        const payload = {
            username: user.username,
        }

        const token = await this.authService.signPayload(payload);
        return {
            user, token
        }

    }

    
}