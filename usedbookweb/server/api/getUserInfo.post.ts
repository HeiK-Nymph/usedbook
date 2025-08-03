import { baseURL } from "~/composables/constants"

export default defineEventHandler(async (event) => {
    try{
        
        const userId = await readBody(event)
        if (!userId){
            return null
        }
        const data = await $fetch('/api/userInfo/get',{
            baseURL:baseURL,
            method:'POST',
            body:userId
        }) 
        return data
    }catch(e){
        console.error(e)
        
        return null
    }
})