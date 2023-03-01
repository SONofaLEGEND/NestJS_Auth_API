import * as mongoose from 'mongoose';

import * as bcyprt from 'bcrypt';

export const userSchema = new mongoose.Schema({
    fullname: {
        type:String,
        
    },

    username: {
        type:String,
        required:true,
        trim:true
        
    },

    email: {
        type:String,
        required:true
    },
    password:{
        type:String,
        select:false,
        required:true
    },
    createdAt: {
        type:Date,
        default:Date.now
    },

    dob: {
        type:Date
    },

    bio: {
        type:String
    },
    
    profileImg:
    {
        type:String
    }
});


userSchema.pre('save', async function(next:any){
    try {
        if(!this.isModified('password')){
            return next();
        }

        const hashedPassword = await bcyprt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    }
    catch(error){
        return next(error);
    }
})