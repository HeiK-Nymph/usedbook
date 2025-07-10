<template>
    <div class="cs">
        {{ bookId }}
    </div>
</template>
    
<script setup lang='ts'>
    const route = useRoute()
    const bookId = route.params.postId
</script>
    
<style scoped>
    .cs{
        height: 800px;
        background-color: salmon;
    }
</style>