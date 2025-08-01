import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:String,
    content:String,
    imgCount:Number,
    imgURL:{
        type:[String]
    },
    status:{
        type:String,
        enum:['finish', 'editing', 'deleted','review']
    },
    tags:{
        type:[String]
    },
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    }
},{timestamps:true})

postSchema.index({createdAt:-1})

export default mongoose.model('posts', postSchema)