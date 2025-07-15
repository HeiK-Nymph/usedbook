<template>
    <div class="followersItemMain">
        <div class="followersItemMainAvatar">
            <el-avatar :src="avatarURL" style="height: 50px; width: 50px;"/>
        </div>
        <div class="followersItemMainUserName">
            <NuxtLink class="followersItemMainUserNameItem" :to="{path:'/user/' + userId}">{{ userName }}</NuxtLink>
        </div>
        
        
    </div>
</template>
    
<script setup lang='ts'>
    const props = defineProps(['userId', 'avatarURL', 'userName'])
    const avatarURL =  baseURL + "/api/" + props.avatarURL
</script>
    
<style scoped>
    .followersItemMainUserNameItem{
        text-decoration: none;
        color: black;
    }
    .followersItemMainUserNameItem:hover{
        color:#2a71ec
    }
    .followersItemMainBto{
        margin-left: auto;
        
    }
    .followersItemMainUserName{
        height: 50px;
        line-height: 25px;
        font-size: 20px;
        font-weight: bold;
        color:black;
        margin-left: 10px;
    }
    .followersItemMain{
        border: 1px solid darkgrey;
        margin-top: 15px;
        border-radius: 10px;
        box-shadow: 0 0 5px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        padding:10px
    }
</style>