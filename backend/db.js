import mongoose from "mongoose";

const db_url = 'mongodb://localhost:27017/usedbook'

export async function db(){
    try{
        await mongoose.connect(db_url)
        console.log('连接成功')
    }catch(err){
        console.group('连接失败', err)
    }
}