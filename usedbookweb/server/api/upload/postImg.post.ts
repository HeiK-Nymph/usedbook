import { baseURL } from "~/composables/constants"

export default defineEventHandler(async (event) => {
    
    try{
        
        const files = await readMultipartFormData(event)
        const headers = getRequestHeaders(event)
        const userId = headers['x-user-id'] || headers['X-User-ID']
        const postId = headers['x-post-id'] || headers['X-Post-ID']
        if (!files || !files.length) {
            return {
                errno:1,
                data:{
                    url:null,
                    postId:null,
                    tip:'上传文件为空'
                }
            }
        }
        const file = files[0]
        const form = new FormData()
        form.append('postImg', new Blob([file.data]), file.filename)
        if (typeof userId === 'string'){
            form.append('userId',userId)
        }
        if (typeof postId === 'string'){
            form.append('postId', postId)
        }
        
        const data = await $fetch('/api/upload/postImg',{
            baseURL:baseURL,
            method:'POST',
            body:form
        }) as {
            errno:number,
            data:{
                url:string,
                postId:string,
                tip:string
            }
        }
        return {
            errno:data.errno,
            data:{
                url:data.data.url,
                postId:data.data.postId,
                tip:data.data.tip
            }
        }
    }catch(e){
        console.error(e)
        return {
            errno:1,
            data:{
                url:null,
                postId:null,
                tip:'上传失败'
            }
        }
    }
})