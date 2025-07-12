<template>
    <NuxtPage/>
</template>
    
<script setup lang='ts'>
    definePageMeta({
        middleware:['user-check']
    })
</script>
    
<style scoped>
    
</style>