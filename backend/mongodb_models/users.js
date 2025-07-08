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