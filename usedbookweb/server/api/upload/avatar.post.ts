import { baseURL } from "~/composables/constants"

export default defineEventHandler( async (event) => {
    try{
        const files = await readMultipartFormData(event)
        const headers = getRequestHeaders(event)
        const userId = headers['x-user-id'] || headers['X-User-ID']
        if (!files || !files.length) {
            return {res:'2'}
        }
        const file = files[0]
        if (file.type && !['image/jpeg', 'image/png'].includes(file.type)) {
            return {res:'2'}
        }
        if (file.data.byteLength > 2 * 1024 * 1024){
            return {res:'2'}
        }
        console.log('?',file.filename)
        const form = new FormData()
        form.append('avatar', new Blob([file.data]), file.filename)
        if (typeof userId === 'string') {
            form.append('userId', userId)
        }
        const data = await $fetch('/api/upload/avatar',{
            baseURL:baseURL,
            method:'POST',
            body:form
        }) as {res:string, avatarURL:string}
        return data
    }catch(e){
        console.error(e)
        return {res:'2'}
    }
})