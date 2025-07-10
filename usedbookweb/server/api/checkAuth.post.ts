export default defineEventHandler(async (event) => {
    try{
        const body = await readBody(event)
        const {accessToken} = body
        const refreshToken = getCookie(event, 'refreshToken')
        const data = await $fetch('/api/auth/verify',{
            baseURL:'http://192.168.1.2:8000',
            method:'POST',
            body:{accessToken:accessToken, refreshToken:refreshToken}
        }) as {res:string, accessToken:string, userId:string}
        return {res:data.res, accessToken:data.accessToken, userId:data.userId}
    }catch(e){
        console.error(e)
        return {res:'3', accessToken:'undefine',userId:null}
    }
})