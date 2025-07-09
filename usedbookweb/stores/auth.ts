import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', ()=>{
    const isLoggedIn = ref(false)
    const accessToken = ref("")
    
    
    
    return { isLoggedIn, accessToken }
})