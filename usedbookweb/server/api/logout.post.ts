export default defineEventHandler(async (event)=>{
    const refreshToken = getCookie(event, 'refreshToken')
    try{
        await $fetch('/api/logout',{
            baseURL:'http://192.168.1.2:8000',
            method:'POST',
            body:{refreshToken:refreshToken}
        })
        return
    }catch(e){
        console.error(e)
        return
    }
})