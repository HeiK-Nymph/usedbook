import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', ()=>{
    const isLoggedIn = ref(false)
    interface userInter{
        id:string,
        avatar:string,
        name:string
    }
    const user = ref<userInter | null>(null)
    
    async function initAuth(){
        if (import.meta.client){
            const saved = localStorage.getItem('isLoggedIn')
            if (saved){
                isLoggedIn.value = JSON.parse(saved)
            }
        }
    }
    
    
    
    function login(userInfo:userInter){
        isLoggedIn.value = true
        user.value = userInfo
        if (import.meta.client){
            localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn.value))
        }
    }
    function logout(){
        isLoggedIn.value = false
        user.value = null
        if (import.meta.client){
            localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn.value))
        }
    }
    return {isLoggedIn, user, login, logout, initAuth}
})