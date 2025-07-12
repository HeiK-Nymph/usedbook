<template>
    <div class="main">
        <div class="mainLeft">
            <div class="mainLeftAvatar">
                <el-avatar :src="avatarURL" style="height: 150px; width: auto; border: 2px solid rgba(105, 105, 105, 0.2);"/>
            </div>
        </div>
    </div>
    <NuxtPage/>
    <button @click="cs">测试</button>
</template>
    
<script setup lang='ts'>
    definePageMeta({
        middleware:['userid-check']
    })
    import { baseURL } from '#imports'
    const auth = useAuthStore()

    const {data} = await useAsyncData('avatarURL',() => $fetch('/api/getAvatar',{
        method:'POST',
        body:{userId: auth.userId}
    }))
    const avatarURL = ref( baseURL + "/api/" + data.value?.avatarURL)


    const runtime = useRuntimeConfig()

    async function cs(){
        console.log(baseURL)
    }
    
</script>
    
<style scoped>
    .mainLeftAvatar{
        display: flex;
        justify-content: center;
        border: 1px solid blue;
    }
    .mainLeft{
        border: 1px solid darkgray;
        box-shadow: 0 0 15px rgba(0,0,0,0.3);
        width: 400px;
        height: 400px;
        display: flex;
        flex-direction: column;
    }
    .main{
        
        border: 1px solid red;
        margin-left: 5%;
        margin-right: 5%;
        display: flex;

    }
</style>