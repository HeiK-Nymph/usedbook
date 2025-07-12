<template>
    <div class="commentMain"></div>
</template>
    
<script setup lang='ts'>
    definePageMeta({
        middleware:['user-check']
    })
</script>
    
<style scoped>
    .commentMain{
        height: 400px;
        background-color: blue;
    }
</style>