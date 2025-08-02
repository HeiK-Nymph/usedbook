import express from 'express'
import postsModel from '../mongodb_models/posts.js'

const router = express.Router()

router.post('/getPostsCnt', async (req, res) => {
    try{
        const cnt = await postsModel.countDocuments({status:'finish'})
        return res.json({
            res:'1',
            tip:'获取数据成功',
            postsCnt:cnt
        })
    }catch(e){
        console.error(e)
        return res.json({
            res:'2',
            tip:'获取数据失败',
            postsCnt:null
        })
    }
    
})

export default router