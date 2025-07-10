import express from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import tokensModel from '../mongodb_models/tokens.js'


const router = express.Router()
router.use(express.json())

router.post('/auth/verify', async (req, res) => {
    const {accessToken} = req.body
    const {refreshToken} = req.body
    try{
        const data = await tokensModel.findOne({token:refreshToken})
        jwt.verify(accessToken,process.env.ACCESS_SECRET, async (err,d1) => {
            if (err){
                try{
                    
                    if (data){
                        jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, d2) => {
                            if (err){
                                return res.json({res:'3', accessToken:'undefine'}) // 长token验证失败，需要重新登录
                            }
                            const newAccessToken = jwt.sign(
                                {_id:data.userId},
                                process.env.ACCESS_SECRET,
                                {expiresIn:'1h'}
                            )
                            return res.json({res:'2', accessToken:newAccessToken, userId:data.userId}) // 长token验证成功，返回一个新的短token
                        })
                    }
                    else{
                        return res.json({res:'3', accessToken:'undefine'}) // 长token验证失败，需要重新登录
                    }
                }catch(e){
                    console.error(e)
                    return res.json({res:'3', accessToken:'undefine'}) // 数据库查询出错，但依旧需要用户重新登录
                }
            }
            else{
                return res.json({res:'1', accessToken:'undefine', userId:data.userId}) // 成功验证短token，不用刷新短token

            }
        })
    }catch(e){
        console.error(e)
        return res.json({res:'3', accessToken:'undefine'}) // 数据库查询出错，但依旧需要用户重新登录
    }
    
})

export default router