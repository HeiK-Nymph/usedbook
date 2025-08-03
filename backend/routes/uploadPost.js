import express from 'express'
import usersModel from '../mongodb_models/users.js'
import postsModel from '../mongodb_models/posts.js'
import mongoose from 'mongoose'

const router = express.Router()
router.use(express.json())

router.post('/upload/post', async (req, res) => {
    const {userId, postId, title, tags, content} = req.body
    
    var userIdObj = null
    var postIdObj = null
    if (userId){
        userIdObj = mongoose.Types.ObjectId.createFromHexString(userId)
    }
    if (postId){
        postIdObj = mongoose.Types.ObjectId.createFromHexString(postId)
    }
    const trimmedTags = Array.isArray(tags) ? tags.slice(0, 5) : []
    try{
        if (postIdObj){
            await postsModel.updateOne({_id:postIdObj},{
                authorId:userIdObj,
                title:title,
                tags:trimmedTags,
                content:content,
                status:'review',
                
            })
            return res.json({
                res:'1',
                tip:'上传成功'
            })
        }else{
            await postsModel.create({
                authorId:userIdObj,
                title:title,
                tags:trimmedTags,
                content:content,
                status:'review',
                
            })
            return res.json({
                res:'1',
                tip:'上传成功'
            })
        }
    }catch(e){
        console.error(e)
        return res.json({
            res:'2',
            tip:'上传失败'
        })
    }
})

export default router