import { baseURL } from "~/composables/constants"

export default defineEventHandler(async (event)=>{
    const refreshToken = getCookie(event, 'refreshToken')
    try{
        await $fetch('/api/logout',{
            baseURL:baseURL,
            method:'POST',
            body:{refreshToken:refreshToken}
        })
        return
    }catch(e){
        console.error(e)
        return
    }
})