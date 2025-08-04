<template>
    <div class="postCommentItemMain">
        {{ comment }}
    </div>
    <hr style="width: 100%; border: 1px solid whitesmoke;" />
</template>
    
<script setup lang='ts'>
    const props = defineProps(['selfId', 'comment'])
</script>
    
<style scoped>
    .postCommentItemMain{
        margin: 15px 0;
    }
</style>