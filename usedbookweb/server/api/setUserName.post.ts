import { baseURL } from "~/composables/constants"

export default defineEventHandler(async (event) => {
    try{
        const newUserName = await readBody(event)
        const data = await $fetch('/api/setUserName',{
            baseURL:baseURL,
            method:'POST',
            body:newUserName
        }) as {res:string, tip:string}
        return data
    }catch(e){
        console.error(e)
        return {res:'2', tip:'上传失败'}
    }
})