import mongoose from "mongoose";
import fs from 'fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadDir = path.join(__dirname,'../uploads')

const avatarSchema = mongoose.Schema({
    userId:mongoose.Types.ObjectId,
    avatarURL:String,
})

avatarSchema.methods.deleteAvatar = async function (){
    const filePath = path.join(uploadDir , this.avatarURL)
    try{
        await fs.rm(filePath)
        return true
    }catch(e){
        console.error(e)
        return false
    }
}

export default mongoose.model('avatars',avatarSchema)