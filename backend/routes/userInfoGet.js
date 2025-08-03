import express from 'express'
import usersModel from '../mongodb_models/users.js'
import mongoose from 'mongoose'

const router = express.Router()
router.use(express.json())

router.post('/userInfo/get', async (req, res) => {
    const {userId} = req.body
    if (!mongoose.Types.ObjectId.isValid(userId)){
        return res.json(null)
    }
    try{
        const user = await usersModel.findOne({_id:userId}).populate('followers','username avatar').populate('following','username avatar').populate('favoposts')
        return res.json(user)
    }catch(e){
        console.error(e)
        return res.json(null)
    }
})

export default router