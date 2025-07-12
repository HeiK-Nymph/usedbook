import express from 'express'
import usersModel from '../mongodb_models/users.js'

const router = express.Router()
router.use(express.json())

router.post('/avatar/get', async (req, res) => {
    const {userId} = req.body
    try{
        const user = await usersModel.findOne({_id:userId})
        return res.json({res:'1', avatarURL:user.avatar})
    }catch(e){
        console.error(e)
        return res.json({res:'2', avatarURL:null})
    }
})

export default router