<template>
    <NuxtLink :to="{path:'/' + postId}" class="postItemView">
        <div style="min-width: 150px;">
            <el-image :src="coverURL" class="postItemCover" fit="fill">

            </el-image>
        </div>
        <div class="postItemTitle">
            {{ title }}
        </div>
        <div style="flex-grow: 1;">
            <span class="postItemTags" v-for="tag in tags" :key="tag">
            {{ tag }}
            </span>
        </div>
        
    </NuxtLink>
</template>
    
<script setup lang='ts'>
    import { baseURL } from '#imports';
    const props = defineProps(['postId', 'title', 'tags', 'cover'])
    let coverURL = ""
    if (props.cover){
        coverURL = baseURL + '/api' + props.cover
    }else{
        coverURL = '/爱丽丝头像.png'
    }
    
    
</script>
    
<style scoped>
    .postItemTags{
        background-color: #d4e3fc;
        color: #4b7dd1;
        border-radius: 12px;
        padding: 2px 8px;
        font-size: 12px;
        margin: 2px;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 90%;
    }
    .postItemView > div:last-child {
        flex-wrap: wrap;
        gap: 4px;
        padding: 8px;
        max-height: 100px; /* 限制 tags 区域的最大高度 */
        overflow: hidden; /* 直接隐藏超出部分 */
        /* 如果希望允许滚动： */
        /* overflow-y: auto; */
    }
    .postItemTitle{
        margin-left: 10px;
        font-size: 20px;
        font-weight: bold;
        color: black;
    }
    .postItemTitle:hover{
        color:#2a72ee
    }
    .postItemCover{
        height: 150px;
        width: 100%;
        border-radius: 15px 15px 0 0;
    }
    .postItemView{
        border: 1px solid darkgray;
        box-shadow: 0 0 15px rgba(0,0,0,0.3);
        border-radius: 15px;
        max-width: 250px;
        width: 100%;
        height: 300px;
        text-decoration: none;
        display: flex;
        flex-direction: column;
    }
</style>