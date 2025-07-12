export default defineEventHandler(async (event) => {
    try{
        
        const userId = await readBody(event)
        const data = await $fetch('/api/avatar/get',{
            baseURL:'http://192.168.1.2:8000',
            method:'POST',
            body:userId
        }) as {res:string, avatarURL:string}
        return {res:data.res, avatarURL:data.avatarURL}
    }catch(e){
        console.error(e)
        
        return {res:'2', avatarURL:null}
    }
})