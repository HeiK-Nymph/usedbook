import express from 'express'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import tokensModel from '../mongodb_models/tokens.js'


const router = express.Router()
router.use(express.json())


router.post('/auth/verify', async (req, res) => {
    const {accessToken} = req.body
    jwt.verify(accessToken,process.env.ACCESS_SECRET,(err,data) => {
        if (err){
            return res.json({res:'ls',accessToken:'ls'})
        }
        return res.json({res:'1', accessToken:'undefine'})
    })
})

export default router