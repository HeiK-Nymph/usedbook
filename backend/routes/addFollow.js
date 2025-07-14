import express from 'express'
import usersModel from '../mongodb_models/users.js'
import mongoose from 'mongoose'

const router = express.Router()
router.use(express.json())

router.post('/addFollow', async (req, res) => {
    const {selfUserId, otherUserId} = req.body
    const selfUserIdObj = mongoose.Types.ObjectId.createFromHexString(selfUserId)
    const otherUserIdObj = mongoose.Types.ObjectId.createFromHexString(otherUserId)
    try{
        await usersModel.updateOne(
            {_id:selfUserId},
            {$addToSet:{following:otherUserIdObj}}
        )
        await usersModel.updateOne(
            {_id:otherUserId},
            {$addToSet:{followers:selfUserIdObj}}
        )
        return res.json({res:'1'})
    }catch(e){
        console.error(e)
        return res.json({res:'2'})
    }
})

export default router