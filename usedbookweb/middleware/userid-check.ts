import { useAuthStore } from "#imports"
const auth = useAuthStore()

export default defineNuxtRouteMiddleware(async (to) => {
  if (auth.userId !== to.params.userId){
    return navigateTo('/')
  }
  if (to.path === `/user/${to.params.userId}` || to.path === `/user/${to.params.userId}/`) {
    return navigateTo(`/user/${to.params.userId}/comment`)
  }
})