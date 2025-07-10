import { useAuthStore } from "#imports"

export const useCheckAuth = async ()=>{
    const auth = useAuthStore()
    if (auth.isLoggedIn){
        return true
    }
    try{
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken){
            return false
        }


        const data = await $fetch('/api/checkAuth', {
            method:'post',
            body:{accessToken: accessToken}
        }) as {res: string, accessToken:string, userId:string}
        const {res, userId} = data
        if (res === '1'){
            auth.isLoggedIn = true
            auth.userId = userId
            return true
        }
        else if (res === '2'){
            auth.isLoggedIn = true
            localStorage.setItem('accessToken', data.accessToken)
            auth.userId = userId
            return true
        }
        else{
            return false
        }
    }catch(err){
        console.error(err)
        return false
    }
}