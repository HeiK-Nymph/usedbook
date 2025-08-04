import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import { createServer } from 'http'
import cors from 'cors'
import dayjs from 'dayjs'
import multer from 'multer'

import { db } from './db.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()



const logsDir = path.join(__dirname, 'logs')
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir)

function accessMiddleware(req, res, next){
  const {url, ip} = req
  fs.appendFileSync(path.join(__dirname, 'logs', 'access.log'), `[${new Date().toISOString()}] ${url} ${ip} \r\n`)
  next()
}
app.use(accessMiddleware)

db().then(async() => {
    console.log('可以开始监听服务了')
    const PORT = process.env.PORT || 8000
    const server = createServer(app)
    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
    // posts.create({
    //   title:'测试标题',
    //   content:'测试内容',
    //   authorId:'894',
    //   createAt:dayjs().format('YYYY-MM-DD'),
    //   updateAt:dayjs().format('YYYY-MM-DD')
    // })
})

app.use(express.static(path.resolve(__dirname, '../usedbookweb/.output/public')));
app.use('/api',express.static(path.resolve(__dirname, './uploads')));


import registerRouter from './routes/register.js'
app.use('/api', registerRouter)

import loginRouter from './routes/login.js'
app.use('/api', loginRouter)

import authVerif from './routes/authVerify.js'
app.use('/api',authVerif )

import logout from './routes/logout.js'
app.use('/api', logout)

import avatarGet from './routes/userInfoGet.js'
app.use('/api',avatarGet)

import unFollow from './routes/unFollow.js'
app.use('/api', unFollow)

import addFollow from './routes/addFollow.js'
app.use('/api', addFollow)

const avatarDir = path.join(__dirname,'uploads/avatar')
if (!fs.existsSync(avatarDir)) fs.mkdirSync(avatarDir, {recursive: true})
import uploadAvatar from './routes/uploadAvatar.js'
app.use('/api', uploadAvatar)

import setUserName from './routes/setUserName.js'
app.use('/api', setUserName)

import setUserBio from './routes/setUserBio.js'
app.use('/api', setUserBio)

import changePassword from './routes/changePassword.js'
app.use('/api', changePassword)

const postImgDir = path.join(__dirname,'uploads/postImg')
if (!fs.existsSync(postImgDir)) fs.mkdirSync(postImgDir, {recursive: true})
import uploadPostImg from './routes/uploadPostImg.js'
app.use('/api', uploadPostImg)

import uploadPost from './routes/uploadPost.js'
app.use('/api', uploadPost)

import getPostsCnt from './routes/getPostsCnt.js'
app.use('/api', getPostsCnt)

import getPosts from './routes/getPosts.js'
app.use('/api', getPosts)

import getPostItem from './routes/getPostItem.js'
app.use('/api', getPostItem)

import addFavoPost from './routes/addFavoPost.js'
app.use('/api', addFavoPost)

import unFavoPost from './routes/unFavoPost.js'
app.use('/api', unFavoPost)

import uploadComment from './routes/uploadComment.js'
app.use('/api', uploadComment)