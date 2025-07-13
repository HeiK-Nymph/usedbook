export default defineEventHandler(async (event) => {
    try{
        
        const userId = await readBody(event)
        const data = await $fetch('/api/userInfo/get',{
            baseURL:'http://192.168.1.2:8000',
            method:'POST',
            body:userId
        }) 
        return data
    }catch(e){
        console.error(e)
        
        return {res:'2'}
    }
})