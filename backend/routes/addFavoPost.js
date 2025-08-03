import express from 'express'
import usersModel from '../mongodb_models/users.js'
import postsModel from '../mongodb_models/posts.js'
import mongoose from 'mongoose'

const router = express.Router()
router.use(express.json())

router.post('/addFavoPost', async (req, res) => {
    const {userId, postId} = req.body
    var userIdObj = null
    var postIdObj = null
    if (userId){
        userIdObj = mongoose.Types.ObjectId.createFromHexString(userId)
    }
    if (postId){
        postIdObj = mongoose.Types.ObjectId.createFromHexString(postId)
    }
    try{
        await postsModel.updateOne({_id:postIdObj}, {$addToSet:{favo:userIdObj}})
        await usersModel.updateOne({_id:userIdObj}, {$addToSet:{favoposts:postIdObj}})
        return res.json({
            res:'1',
            tip:'收藏成功'
        })
    }catch(e){
        console.error(e)
        return res.json({
            res:'2',
            tip:'收藏失败'
        })
    } 
})

export default router