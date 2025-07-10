<template>
    <div class="ss">

    </div>
</template>
    
<script setup lang='ts'>
    onBeforeMount(async ()=>{
        if (!await useCheckAuth()){
            navigateTo('/login')
        }
    })
    
</script>
    
<style>
    .ss{
        height: 800px;
        background-color: olive;
    }
</style>