import express from 'express'
import postsModel from '../mongodb_models/posts.js'
import comments from '../mongodb_models/comments.js'
import mongoose from 'mongoose'

const router = express.Router()
router.use(express.json())

router.post('/getPostItem', async (req, res) => {
    const {postId} = req.body
    if (!mongoose.Types.ObjectId.isValid(postId)){
        return res.json(null)
    }
    try{
        const data = await postsModel.findOne({_id:postId}).populate('authorId', 'username avatar').populate('comments')
        return res.json({
            res:'1',
            tip:'获取成功',
            content:data
        })
    }catch(e){
        console.error(e)
        return res.json(null)
    }
})

export default router