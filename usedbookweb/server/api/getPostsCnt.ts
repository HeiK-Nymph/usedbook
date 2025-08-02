import { baseURL } from "~/composables/constants"

export default defineEventHandler(async (event) => {
    try{
        const data = await $fetch('/api/getPostsCnt',{
            method:'POST',
            baseURL:baseURL
        }) as {res:string, tip:string, postsCnt:number}
        return data
    }catch(e){
        console.error(e)
        return {
            res:'2',
            tip:'获取数据失败',
            postsCnt:null
        }
    }
})