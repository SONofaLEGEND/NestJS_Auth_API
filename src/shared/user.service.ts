import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/types/user.types';
import { LoginDTO, RegisterDTO } from 'src/auth/auth.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService{
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async create(userDTO: RegisterDTO):Promise<User>{
        const { username } = userDTO;
        const { email } =  userDTO;
        const user = await this.userModel.findOne({username});
        const user1 = await this.userModel.findOne({email});
        if(user){
            throw new HttpException('Username already taken', HttpStatus.BAD_REQUEST);
        }
        if(user1){
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const createdUser = new this.userModel(userDTO);
        await createdUser.save();
        return createdUser;

    }

    async findByLogin(userDTO:LoginDTO):Promise<User>{
        const { username, password } = userDTO;
        const user = await this.userModel.findOne({username}).select('+password');

        if(!user){
            throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);

        }

        return user;


    }

    async findByUsername(username:string):Promise<User>{
        const user = await this.userModel.findOne({username});
        return user;
    }
    async findByPayload(payload:any){
        const { username } = payload;
        const user = await this.userModel.findOne({username});
        return user;
    }
    async findById(payload:any){
        const { id } = payload;
        const user = await this.userModel.findById({id});
        return user;
    }

    async update(id:string, userDTO:RegisterDTO):Promise<User>{
        const user = await this.userModel.findById(id);

        if(!user) {
            throw new NotFoundException('User not found');
        }
        
        const hashedPassword = await bcrypt.hash(userDTO.password, 10);
        const updatedUser = await this.userModel.findByIdAndUpdate(id,
            {
                ...userDTO,
                password: hashedPassword,
            }, { new:true });

            if(!updatedUser) {
                throw new NotFoundException('User not found');
            }

            return updatedUser;
    }

    async delete(id:string):Promise<void>{
        const result = await this.userModel.findByIdAndDelete(id).exec();

        if(!result) {
            throw new NotFoundException('User not found');
        }
    }
}