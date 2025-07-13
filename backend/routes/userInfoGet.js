import express from 'express'
import usersModel from '../mongodb_models/users.js'

const router = express.Router()
router.use(express.json())

router.post('/userInfo/get', async (req, res) => {
    const {userId} = req.body
    try{
        const user = await usersModel.findOne({_id:userId}).populate('followers','username avatar').populate('following','username avatar')
        return res.json(user)
    }catch(e){
        console.error(e)
        return res.json({res:'2'})
    }
})

export default router