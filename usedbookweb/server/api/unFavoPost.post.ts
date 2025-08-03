import { baseURL } from "~/composables/constants";

export default defineEventHandler(async (event) => {
    try{
        const info = await readBody(event)
        const data = await $fetch('/api/unFavoPost',{
            baseURL:baseURL,
            method:'POST',
            body:info
        }) as {res:string, tip:string}
        return data
    }catch(e){
        console.error(e)
        return {
            res:'2',
            tip:'请求失败'
        }
    }
})