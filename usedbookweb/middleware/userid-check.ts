export default defineNuxtRouteMiddleware((to) => {
    
    if (to.path === `/user/${to.params.userId}` || to.path === `/user/${to.params.userId}/`){
        return navigateTo(to.path + '/comment')
    }
})