import express, { json } from 'express'
import dayjs from 'dayjs'
import users from '../mongodb_models/users.js'

const router = express.Router()
router.use(express.json())

router.post('/login', async (req, res)=>{
    const {email, password} = req.body
    try{
        const user = await users.findOne({email:email})
        if (!user){
            return res.json({res:'2'})
        }
        else{
            if (await user.verifyPassword(password)){
                user.meta.lastLogin = dayjs().format('YYYY-MM-DD')
                await user.save()
                return res.json({res:'1'})
            }
            else{
                return res.json({res:'2'})
            }
        }
    }catch(err){
        console.error(err)
        return res.json({res:'3'})
    }
})

export default router