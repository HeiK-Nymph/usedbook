import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts',
    },
    content:String,
    status:{
        type:String,
        enum:['finish', 'deleted']
    },
},{timestamps:true})

commentsSchema.index({createdAt:-1})

export default mongoose.model('comments', commentsSchema)
