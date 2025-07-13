import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    username:{
        type:String,
        unique:true
    },
    passwordHash:String,
    status:{
        type:String,
        enum:['active', 'suspended', 'deleted']
    },
    roles:{
        type:String,
        enum:['user', 'admin']
    },
    avatar:String,
    bio:String,
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ],
    pubposts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'posts'
        }
    ],
    favoposts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'posts'
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'messages'
        }
    ],
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comments'
        }
    ],
    meta:{
        createAt:String,
        updateAt:String,
        lastLogin:String,
    }
})

userSchema.methods.verifyPassword = async function(inputPassword){
    return await bcrypt.compare(inputPassword, this.passwordHash)
}

export default mongoose.model('users', userSchema)