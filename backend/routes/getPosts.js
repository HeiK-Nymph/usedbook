import express from 'express'
import postsModel from '../mongodb_models/posts.js'

const router = express.Router()
router.use(express.json())

router.post('/getPosts', async (req, res) => {
    try{
        const {page} = req.body
        const data = await postsModel.find({status:'finish'}).sort({updatedAt:-1}).skip((page - 1) * 24).limit(24)
        return res.json({
            res:'1',
            tip:'获取数据成功',
            content:data
        })
    }catch(e){
        console.error(e)
        return res.json({
            res:'2',
            tip:'获取数据失败',
            content:null
        })
    }
})

export default router