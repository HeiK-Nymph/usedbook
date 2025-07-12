export default defineNuxtRouteMiddleware((to) => {
    const auth = useAuthStore()
    if (auth.userId !== to.params.userId){
        return navigateTo('/')
    }
    if (to.path === `/user/${auth.userId}` || to.path === `/user/${auth.userId}/`){
        return navigateTo(to.path + '/comment')
    }
})