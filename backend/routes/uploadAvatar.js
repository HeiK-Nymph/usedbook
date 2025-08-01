import express from 'express'
import usersModel from '../mongodb_models/users.js'
import avatarsModel from '../mongodb_models/avatars.js'
import multer from 'multer'
import { fileURLToPath } from 'url'
import path from 'path'



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const avatarDir = path.join(__dirname,'../uploads/avatar')


const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, avatarDir)
    },
    filename:(req,file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

const upload = multer({
    storage
})

const router = express.Router()

router.post('/upload/avatar', upload.single('avatar'), async (req, res) => {
    if (!req.file){
        return res.json({
            res:'2',
            avatarURL:null
        })
    }
    const userId = req.body.userId
    
    try{
        const avatarURL = `/avatar/${req.file.filename}`
        await usersModel.updateOne({_id:userId}, {avatar:avatarURL})
        const outAvatar = await avatarsModel.findOne({userId:userId})
        if (outAvatar){
            await outAvatar.deleteAvatar()
            await avatarsModel.deleteMany({userId:userId})
        }
        await avatarsModel.create({
            userId:userId,
            avatarURL:avatarURL
        })
        return res.json({
            res:'1',
            avatarURL:avatarURL
        })

    }catch(e){
        console.error(e)
        return res.status(400).json({
            res:'2',
            avatarURL:null
        })
    }
})

export default router