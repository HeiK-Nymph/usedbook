export default defineEventHandler(async (event) => {
    try{
        const form = await readBody(event)
        const data = await $fetch('/api/register',{
            baseURL:'http://192.168.1.2:8000',
            method:'POST',
            body:form
        }) as {res:string}
        return {res:data.res}
    }catch(e){
        console.error(e)
        return {res:'3'}
    }
})