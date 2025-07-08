import express from 'express'
import dayjs from 'dayjs'
import users from '../mongodb_models/users.js'
import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 10

const router = express.Router()
router.use(express.json())

router.post('/register', async (req, res)=>{
    const {email, password, captcha} = req.body
    if (captcha === '114514'){
        try{
            const existingUser = await users.findOne({ email })
            if (existingUser) {
            return res.json({ res: '4' }) // 邮箱已存在
            }

            const salt = await bcrypt.genSalt(SALT_ROUNDS)
            const passwordHash = await bcrypt.hash(password, salt)

            await users.create({
            email:email,
            username:email,
            passwordHash:passwordHash,
            status:'active',
            roles:'user',
            avatar:'../uploads/avatar/default.png',
            bio:'该用户太懒了，还没有设置简介',
            meta:{
                createAt:dayjs().format('YYYY-MM-DD'),
                updateAt:dayjs().format('YYYY-MM-DD'),
                lastLogin:dayjs().format('YYYY-MM-DD'),
            }
            })
            res.json({
                res:'1' // 成功注册
            })
        }catch(err){
        console.error(err)
        res.json({
            res:'3' // 数据库有问题啊妈的
        })
        }
    }
    else{
        res.json({
            res:'2' // 验证码错误呢
        })
    }
})

export default router