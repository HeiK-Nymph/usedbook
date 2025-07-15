import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', ()=>{
    const isLoggedIn = ref(false)
    const userId = ref("")
    const updated = ref(false)
    
    return { isLoggedIn,  userId, updated}
})