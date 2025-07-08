import { useAuthStore } from "#imports"
import { navigateTo } from "#imports"

const auth = useAuthStore()

await auth.initAuth()

export default defineNuxtRouteMiddleware( async (to, from)=>{
    console.log(auth.isLoggedIn)
    if (auth.isLoggedIn){
        
        return navigateTo('/')
    }
})