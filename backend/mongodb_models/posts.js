import mongoose, { mongo } from "mongoose";

const postSchema = new mongoose.Schema({
    title:String,
    content:String,
    authorId:mongoose.Schema.Types.ObjectId,
    createAt:String,
    updateAt:String
})

export default mongoose.model('posts', postSchema)