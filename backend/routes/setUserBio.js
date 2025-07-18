import express from 'express'
import usersModel from '../mongodb_models/users.js'

const router = express.Router()
router.use(express.json())

router.post('/setUserBio', async (req, res) => {
    const {newUserBio, userId} = req.body
    try{
        await usersModel.updateOne(
            {_id:userId},
            {bio:newUserBio}
        )
        return res.json({res:'1', tip:'修改成功'})
    }catch(e){
        console.error(e)
        return res.json({res:'2', tip:'更新失败'})
    }
})

export default router