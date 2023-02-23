import {Document} from 'mongoose';
export interface User extends Document {
    fullname:string,
    username:string,
    email:string;
    readonly password:string,
    bio:string;
    createdAt:Date;
    profileImg:string;
}