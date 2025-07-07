import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import { createServer } from 'http'
import cors from 'cors'

import { db } from './db.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(cors({
  origin: 'http://localhost:3000', // 允许Nuxt3的域名
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允许的方法
}));

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
})

app.use(express.static(path.resolve(__dirname, '../usedbookweb/.output/public')));


app.get('/api/cs', (req, res) => {
    console.log('调用成功')
    res.json({
        win:'yes'
    })
})
