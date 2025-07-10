export default defineEventHandler(async (event)=>{
    const body = await readBody(event)
    const data = await $fetch('/api/login',{
        baseURL:'http://192.168.1.2:8000',
        method:'POST',
        body:body
    }) as {res:string, accessToken:string, refreshToken:string, userId:string}

    
    setCookie(event, 'refreshToken', data.refreshToken,{
        httpOnly:true,
        maxAge:30*24*60*60*1000,
        path:'/'
    })
    

    return {res:data.res, accessToken:data.accessToken, userId:data.userId}
})