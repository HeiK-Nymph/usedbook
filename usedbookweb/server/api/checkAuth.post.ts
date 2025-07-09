export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const data = await $fetch('/api/auth/verify',{
        baseURL:'http://192.168.1.2:8000',
        method:'POST',
        body:body
    }) as {res:string, accessToken:string}
    console.log(data.res)
    return {res:data.res, accessToken:data.accessToken}
})