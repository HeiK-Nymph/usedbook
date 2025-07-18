import express from 'express'
import usersModel from '../mongodb_models/users.js'
import bcrypt from 'bcryptjs'
import dayjs from 'dayjs'

const SALT_ROUNDS = 10

const router = express.Router()
router.use(express.json())

router.post('/changePassword', async (req, res) => {
    const {oldPassword, newPassword, userId} = req.body
    try{
        const user = await usersModel.findOne({_id:userId})
        if (!user){
            return res.json({res:'2', tip:'用户不存在'})
        }
        if (await user.verifyPassword(oldPassword)){
            if (await user.verifyPassword(newPassword)){
                return res.json({res:'2', tip:'新密码不能与旧密码相同'})
            }else{
                const salt = await bcrypt.genSalt(SALT_ROUNDS)
                const passwordHash = await bcrypt.hash(newPassword, salt)
                user.passwordHash = passwordHash
                user.meta.updateAt = dayjs().format('YYYY-MM-DD')
                await user.save()
                return res.json({res:'1', tip:'修改成功'})
            }
        }else{
            return res.json({res:'2', tip:'旧密码输入错误'})
        }
    }catch(e){
        console.error(e)
        return res.json({res:'2', tip:'更新失败'})
    }
})

export default router