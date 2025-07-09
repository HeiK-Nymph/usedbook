import express, { json } from 'express'
import dayjs from 'dayjs'
import users from '../mongodb_models/users.js'
import tokensModel from '../mongodb_models/tokens.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const router = express.Router()
router.use(express.json())

router.post('/login', async (req, res)=>{
    const {email, password} = req.body
    try{
        const user = await users.findOne({email:email})
        if (!user){
            return res.json({res:'2', accessToken:'undefine',refreshToken:'undefine'})
        }
        else{
            if (await user.verifyPassword(password)){
                user.meta.lastLogin = dayjs().format('YYYY-MM-DD')
                await user.save()

                const accessToken = jwt.sign(
                    {_id:user._id, username: user.username},
                    process.env.ACCESS_SECRET,
                    {expiresIn:'1h'}
                )
                const refreshToken = jwt.sign(
                    {_id:user._id, username: user.username},
                    process.env.REFRESH_SECRET,
                    {expiresIn:'30d'}
                )

                await tokensModel.deleteMany({
                    userId:user._id
                })

                await tokensModel.create({
                    userId:user._id,
                    token:refreshToken,
                    createdAt:dayjs().format('YYYY-MM-DD'),
                    expiresAt:dayjs().add(30, 'day').format('YYYY-MM-DD')
                })
                
                

                return res.json({res:'1', accessToken:accessToken,refreshToken:refreshToken})
            }
            else{
                return res.json({res:'2', accessToken:'undefine', refreshToken:'undefine'})
            }
        }
    }catch(err){
        console.error(err)
        return res.json({res:'3', accessToken:'undefine'})
    }
})

export default router