<template>
    <div class="usedbooksMain">
        <span style="font-size: 30px; font-weight: bold;">二手书</span>
        <span style="color: darkgray; margin-bottom: 30px; white-space: nowrap;">这里展示了本站所有的 二手书，您可以点击进入以与分享者交流</span>
        <hr style="width: 100%; margin-bottom: 50px;"/>
        <div class="usedbooksGrid">
            <UsedbooksPostsItemView v-for="post in postsArr" :key="post._id"
            :postId="post._id"
            :title="post.title"
            :tags="post.tags"
            :cover="post.imgURL[0]"
            />
        </div>
        <div class="pagination">
            <el-pagination layout="prev, pager, next, jumper" :page-size="24" :total="postsCnt" background style="margin-top: 10px;" :current-page="currentPage" @current-change="handlePageChange"/>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
    import { type TpostsCnt, type Tposts } from '~/types'
    import { baseURL } from '#imports'
    const route = useRoute()
    const router = useRouter()
    const currentPage = ref(1)
    const handlePageChange = (page:number) => {
        currentPage.value = page
        router.push({
            path:route.path,
            query:{
                ...route.query,
                page:page > 1 ? page.toString() : undefined
            }
        })
    }
    onBeforeMount(async ()=>{
        await useCheckAuth()
        if (route.query.page){
            const pageNum = Number(route.query.page)
            currentPage.value = isNaN(pageNum) || pageNum < 1 ? 1 : pageNum
        }
    })
    const {data:postsCntData, refresh:refreshPostsCnt} = await useAsyncData<TpostsCnt>(
        'posts-count',
        () => $fetch('/api/getPostsCnt',{
            method:'POST'
        })
    )
    const postsCnt = computed(() => postsCntData.value?.postsCnt)
    
    const pageKey = computed(() => `posts-page-${currentPage.value}`)
    const {data:postsData, refresh:refreshPosts} = await useAsyncData<Tposts>(
        pageKey,
        () => $fetch('/api/getPosts',{
            method:'POST',
            body:{page:currentPage.value}
        })
    )
    const postsArr = computed(() => postsData.value?.content)
    

    watch(
        () => route.query.page,
        async (newPage) => {
            if (newPage) {
                console.log(postsCnt.value)
                const pageNum = Number(newPage)
                currentPage.value = isNaN(pageNum) || pageNum < 1 ? 1 : pageNum
            } else {
                console.log(postsCnt.value)
                currentPage.value = 1
            }
        }
    )
    
</script>
    
<style scoped>
    .usedbooksGrid{
        display: grid;
        grid-template-columns: repeat(4, 250px);
        justify-content: center;
        justify-items: center;
        
        
        gap: 40px;
    }
    @media (max-width:1200px){
        .usedbooksGrid{
            grid-template-columns: repeat(3, 250px);
            
        }
    }
    @media (max-width:850px) {
        .usedbooksGrid{
            grid-template-columns: repeat(2, 200px);
            
        }
    }
    .pagination{
        display: flex;
        justify-content: center;
    }
    .usedbooksMain{
        display: flex;
        flex-direction: column;
        height: 800px;
        margin-left: 5%;
        margin-right: 5%;
    }
</style>