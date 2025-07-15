const auth = useAuthStore()

export default defineNuxtRouteMiddleware((to) => {
    if (!auth.isLoggedIn){
        return navigateTo('/')
    }
})