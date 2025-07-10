import express from 'express'
import tokensModel from '../mongodb_models/tokens.js'

const router = express.Router()
router.use(express.json())

router.post('/logout', async (req, res)=>{
    const {refreshToken} = req.body
    try{
        await tokensModel.deleteOne({token:refreshToken})
        return res.end()
    }catch(e){
        console.error(e)
        return res.end()
    }
})

export default router