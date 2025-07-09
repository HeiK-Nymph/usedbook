import { useAuthStore } from "#imports"


export const useCheckAuth = async ()=>{
    const auth = useAuthStore()
    if (auth.isLoggedIn){
        return true
    }
    try{
        const accessToken = localStorage.getItem('accessToken')
        
        const data = await $fetch('/api/checkAuth', {
            method:'post',
            body:{accessToken: accessToken}
        }) as {res: string, accessToken:string}
        const {res} = data
        if (res === '1'){
            auth.isLoggedIn = true
        }
    }catch(err){
        console.error(err)
        return false
    }
}