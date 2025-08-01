<template>
    <div class="usedbooksMain">
        <span style="font-size: 30px; font-weight: bold;">二手书</span>
        <span style="color: darkgray; margin-bottom: 30px;">这里展示了本站所有的 二手书，您可以点击进入以与分享者交流</span>
        <hr style="width: 100%;"/>
        <div class="pagination">
            <el-pagination layout="prev, pager, next, jumper" :page-size="24" :total="48" background style="margin-top: 10px;" :current-page="currentPage" @current-change="handlePageChange"/>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
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
    watch(
        () => route.query.page,
        (newPage) => {
            if (newPage) {
                const pageNum = Number(newPage)
                currentPage.value = isNaN(pageNum) || pageNum < 1 ? 1 : pageNum
            } else {
                currentPage.value = 1
            }
        }
    )
</script>
    
<style scoped>
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