import express from 'express'
import usersModel from '../mongodb_models/users.js'
import postsModel from '../mongodb_models/posts.js'
import commentsModel from '../mongodb_models/comments.js'
import mongoose from 'mongoose'

const router = express.Router()
router.use(express.json())

router.post('/upload/comment',async (req, res) => {
    const {userId, userStatus, postId, commentVal} = req.body
    var userIdObj = null
    var postIdObj = null
    if (userStatus === 'suspended' || userStatus === 'deleted'){
        return res.json({
            res:'3',
            tip:'账号被封禁'
        })
    }
    if (userId){
        userIdObj = mongoose.Types.ObjectId.createFromHexString(userId)
    }
    if (postId){
        postIdObj = mongoose.Types.ObjectId.createFromHexString(postId)
    }
    try{
        const newComment = await commentsModel.create({
            userId:userIdObj,
            postId:postIdObj,
            content:commentVal,
            status:'finish'
        })
        await usersModel.updateOne(
            {_id:userIdObj},
            {$addToSet:{comments:newComment._id}}
        )
        await postsModel.updateOne(
            {_id:postIdObj},
            {$addToSet:{comments:newComment._id}}
        )
        return res.json({
            res:'1',
            tip:'回复成功'
        })
    }catch(e){
        console.error(e)
        return res.json({
            res:'2',
            tip:'网络错误'
        })
    }
})

export default router