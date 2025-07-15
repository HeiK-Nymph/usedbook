import { useAuthStore } from "#imports";

export const useLogout = async ()=>{
    const auth = useAuthStore()
    auth.isLoggedIn = false
    auth.userId = ""
    
    localStorage.removeItem('accessToken')
    try{
        await $fetch('/api/logout',{
            method:'POST',
        })
        const route = useRoute()
        if (route.path.startsWith('/user/') || route.path.startsWith('/settings')){
            navigateTo('/')
        }
    }catch(e){
        console.error(e)
    }
}