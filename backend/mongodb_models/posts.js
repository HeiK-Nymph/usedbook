import mongoose, { mongo } from "mongoose";

const postSchema = new mongoose.Schema({
    title:String,
    content:String,
    authorId:String,
    createAt:String,
    updateAt:String
})

export default mongoose.model('posts', postSchema)