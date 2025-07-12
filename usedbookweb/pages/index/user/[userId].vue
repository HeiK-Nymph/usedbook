<template>
    <div class="userMain">
        {{ auth.userId === route.params.userId }}
        
    </div>
    <NuxtPage/>
</template>
    
<script setup lang='ts'>
    definePageMeta({
        middleware:'userid-check'
    })
    import { NuxtPage } from '#components'
    import { useAuthStore } from '#imports'
    const auth = useAuthStore()
    const route = useRoute()
    
    onBeforeMount(async ()=>{
        if (!await useCheckAuth()){
            navigateTo('/login')
        }
    })
    


</script>
    
<style scoped>
    .userMain{
        height: 800px;
        margin-left:5%;
        margin-right: 5%;
        background-color: olive;
        
    }
</style>