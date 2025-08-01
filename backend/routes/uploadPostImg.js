import express from 'express'
import usersModel from '../mongodb_models/users.js'
import postsModel from '../mongodb_models/posts.js'
import multer from 'multer'
import { fileURLToPath } from 'url'
import path from 'path'
import mongoose from 'mongoose'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const postImgDir = path.join(__dirname,'../uploads/postImg')

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, postImgDir)
    },
    filename:(req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

const upload = multer({
    storage
})

const router = express.Router()

router.post('/upload/postImg',upload.single('postImg'), async (req, res) => {
    if (!req.file){
        return res.json({
            errno:1,
            data:{
                url:null,
                postId:null,
                tip:'上传文件为空'
            }
        })
    }
    const userId = req.body.userId
    const postId = req.body.postId
    var userIdObj = null
    var postIdObj = null
    if (userId){
        userIdObj = mongoose.Types.ObjectId.createFromHexString(userId)
    }
    if (postId){
        postIdObj = mongoose.Types.ObjectId.createFromHexString(postId)
    }

    try{
        const postImgURL = `/postImg/${req.file.filename}`
        if (postIdObj){
            const postpd = await postsModel.findOne({_id:postIdObj})
            if (postpd.imgCount >= 3){
                return res.json({
                    errno:2,
                    data:{
                        url:null,
                        postId:postIdObj,
                        tip:'上传图片不能超过三张'
                    }
                })
            }
            await postsModel.updateOne({_id:postIdObj}, {$inc:{imgCount:1}})
            await postsModel.updateOne({_id:postIdObj},{$addToSet:{imgURL:postImgURL}})
            return res.json({
                errno:0,
                data:{
                    url:postImgURL,
                    postId:postIdObj,
                    tip:'上传成功'
                }
            })
        }else{
            const post = await postsModel.create([{
                imgCount:1,
                status:'editing',
                
                authorId:userIdObj
            }])
            await postsModel.updateOne({_id:post[0]._id},{$addToSet:{imgURL:postImgURL}})
            return res.json({
                errno:0,
                data:{
                    url:postImgURL,
                    postId:post[0]._id,
                    tip:'上传成功'
                }
            })
        }
    }catch(e){
        console.error(e)
        return res.json({
            errno:1,
            data:{
                url:null,
                postId:null,
                tip:'上传失败'
            }
        })
    }
})

export default router