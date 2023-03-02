import {Body,Controller,Post,Put,Delete, Param, UseGuards, Get, Request} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoginDTO,RegisterDTO} from './auth.dto';
import {UserService} from 'src/shared/user.service';
import { AuthMiddleware } from './auth.middleware';


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
            user,token
        }

    }

    @Put('update/:id')
    async update(
        @Param('id') id:string, 
        @Body() userDTO:RegisterDTO){
            const user = await this.userService.update(id, userDTO);
            const payload = {
                username: user.username,
              };
            
              const token = await this.authService.signPayload(payload);
            
              return {
                user,
                token,
              };
        }

    @Delete(':id')
    async deleteUser(@Param('id') id:string) {
        await this.userService.delete(id);

        return {
            message: 'User deleted successfully'
        }
    }
    @Get('profile')
    async profile(@Request() req) {
    const resp = this.userService.findByUsername(req.user.username);

    return resp;
    
  }

    
}