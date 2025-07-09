import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    userId:String,
    token:String,
    createdAt:String,
    expiresAt:String
})

export default mongoose.model('tokens', tokenSchema)