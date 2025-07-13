import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
    token:String,
    createdAt:String,
    expiresAt:String
})

export default mongoose.model('tokens', tokenSchema)