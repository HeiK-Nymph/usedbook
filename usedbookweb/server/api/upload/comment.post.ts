import { baseURL } from "~/composables/constants";

export default defineEventHandler(async (event) => {
    try{
        const ls = await readBody(event)
        if (!ls.userId){
            return {
                res:'4',
                tip:'请先登录'
            }
        }
        const data = await $fetch('/api/upload/comment',{
            method:'POST',
            baseURL:baseURL,
            body:ls
        }) as {res:string, tip:string}
        return data
    }catch(e){
        console.error(e)
        return {
            res:'2',
            tip:'网络错误'
        }
    }
})