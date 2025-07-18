import express from 'express'
import usersModel from '../mongodb_models/users.js'

const router = express.Router()
router.use(express.json())

router.post('/setUserName', async (req, res) => {
    const {newUserName, userId} = req.body
    try{
        const ifHas = await usersModel.findOne({username:newUserName})
        if (ifHas){
            return res.json({res:'2', tip:'该昵称已存在'})
        }

        await usersModel.updateOne(
            {_id:userId},
            {username:newUserName}
        )
        return res.json({res:'1', tip:'修改成功'})
    }catch(e){
        console.error(e)
        return res.json({res:'2', tip:'更新失败'})
    }
})

export default router