<template>
    <div class="header">
        <span class="font">最新发布：</span>
        <NuxtLink to="/usedbooks" style="text-decoration: none; color: #5680d9;" class="font2">
            <span >查看更多<el-icon><ArrowRight /></el-icon></span>
        </NuxtLink>
    </div>
    <div class="bookGrid">
        <UsedbooksPostsItemView v-for="post in postsArr" :key="post._id"
        :postId="post._id"
        :title="post.title"
        :tags="post.tags"
        :cover="post.imgURL[0]"
        />
    </div>
</template>
    
<script setup lang='ts'>
    import { type Tposts } from '~/types';
    const {data:postsData, refresh:refreshPosts} = await useAsyncData<Tposts>(
        'index-posts',
        () => $fetch('/api/getPosts',{
            method:'POST',
            body:{page:1}
        })
    )
    const postsArr = computed(() => postsData.value?.content)


</script>
    
<style scoped>
    .bookGrid{
        display: grid;
        grid-template-columns: repeat(4, 250px);
        justify-content: center;
        justify-items: center;
        
        
        gap: 40px;
    }
    @media (max-width:1200px){
        .bookGrid{
            grid-template-columns: repeat(3, 250px);
        }
    }
    @media (max-width:850px) {
        .bookGrid{
            grid-template-columns: repeat(2, 200px);
        }
    }
    .header{
        display: flex;
        gap: 20px;
    }
    .font2{
        height: 25px;
        line-height: 25px;
        padding: 5px 10px;
        border-radius: 10px;
    }
    .font2:hover{
        background-color: #d4e3fc;
    }
    .font{
        font-size: 24px;
        font-weight: 700;
        height: 30px;
        line-height: 30px;
    }
</style>