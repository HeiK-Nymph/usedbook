<template>
    <div class="postItemBackColor">
        <div class="postItemMain">
            <div class="postItemMainLeft">
                <div class="postItemMainLeftContent">
                    <div class="postTitle">
                        {{ title }}
                    </div>
                    <div class="postAndCnt">
                        <div style="display: flex; align-items: center; gap:3px">
                            <el-icon><ChatRound /></el-icon>
                            {{ commentsCnt }}
                        </div>
                        <div style="display: flex; align-items: center; gap: 3px;">
                            <el-icon><Star /></el-icon>
                            {{ favoCnt }}
                        </div>
                    </div>
                    <div class="createdTime">
                        帖子发布于{{ createdTime }}
                    </div>
                    <div v-html="content" style="overflow: auto;"></div> <!--这里是内容区-->
                    <hr style="width: 100%; border: 1px solid whitesmoke;" />
                    <div class="postItemMainLeftContentBottom">
                        <div v-if="!isfavo && auth.isLoggedIn" style="cursor: pointer;" @click="changeFavo">
                            <el-icon><Star /></el-icon>
                        </div>
                        <div v-else-if="isfavo && auth.isLoggedIn" style="cursor:pointer" @click="changeUnFavo">
                            <el-icon style="color: blue;"><Star /></el-icon>
                        </div>
                        <div v-else style="cursor:pointer" @click="changeToLogin">
                            <el-icon><Star /></el-icon>
                        </div>
                    </div>
                </div>
            </div>
            <div class="postItemMainRight">
                你好
            </div>
        </div>
    </div>
    
</template>
    
<script setup lang='ts'>
    import { type TpostItem, type userInfo } from '~/types'
    const route = useRoute()
    const postId = route.params.postId
    onBeforeMount(async ()=>{
        await useCheckAuth()
    })

    const {data:postData, refresh:refreshPost} = await useAsyncData<TpostItem>(
        `post-item-${postId}`,
        () => $fetch('/api/getPostItem', {
            method:'POST',
            body:{postId:postId}
        })
    )
    if (!postData.value){
        navigateTo('/')
    }

    const auth = useAuthStore()
    let isfavo = ref(false)
    const {data:userData, refresh:refreshUser} = await useAsyncData<userInfo>(`postItem-userInfo-${auth.userId}`,() => $fetch('/api/getUserInfo',{
        method:'POST',
        body:{userId: auth.userId}
    }))
    isfavo = computed(() => {
        return userData.value?.favoposts.some(item => item._id === postId) ?? false
    })
    
    
    
    
    const title = postData.value?.content.title
    const authorName = postData.value?.content.authorId.username
    const createdAt = postData.value?.content.createdAt
    let createdTime = ""
    if (createdAt){
        const date = new Date(createdAt)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2,'0')
        const day = String(date.getDate()).padStart(2,'0')
        createdTime = `${year}-${month}-${day}`
    }
    const content = postData.value?.content.content
    const commentsCnt = computed(() => postData.value?.content.comments.length)
    const favoCnt = computed(() => postData.value?.content?.favo?.length || 0)

    async function changeFavo(){
        try{
            const data = await $fetch('/api/addFavoPost',{
                method:'POST',
                body:{
                    userId:auth.userId,
                    postId:postId
                }
            }) as {res:string, tip:string}
            if (data.res === '1'){
                ElMessage.success({
                    message:data.tip,
                    offset:50
                })
            }else{
                ElMessage.error({
                    message:data.tip,
                    offset:50
                })
            }
        }catch(e){
            console.error(e)
            ElMessage.warning({
                message:'收藏失败',
                offset:50
            })
        }
        await refreshPost()
        await refreshUser()
        console.log(isfavo.value)
    }
    
    async function changeUnFavo(){
        try{
            const data = await $fetch('/api/unFavoPost',{
                method:'POST',
                body:{
                    userId:auth.userId,
                    postId:postId
                }
            }) as {res:string, tip:string}
            if (data.res === '1'){
                ElMessage.success({
                    message:data.tip,
                    offset:50
                })
            }else{
                ElMessage.error({
                    message:data.tip,
                    offset:50
                })
            }
        }catch(e){
            console.error(e)
            ElMessage.warning({
                message:'请求失败',
                offset:50
            })
        }
        await refreshPost()
        await refreshUser()
        console.log(isfavo.value)
    }

    async function changeToLogin(){
        ElMessage.warning({
            message:'请先登录',
            offset:50
        })
        await navigateTo('/login')
    }

</script>
    
<style scoped>
    .postItemMainLeftContentBottom{
        font-size: 30px;
        display: flex;
        justify-content: center;
    }
    .postAndCnt{
        background-color: whitesmoke;
        display: flex;
        gap: 15px;
        justify-content: flex-end;
        margin-top: 15px;
        padding: 5px 10px;
        border-radius: 5px;
        color: darkgrey;
    }
    .createdTime{
        display: flex;
        justify-content: center;
        font-size: 15px;
        color: darkgray;
        margin-top: 15px;
        margin-bottom: 20px;
    }
    .postTitle{
        font-size: 25px;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
    }
    .postItemMainRight{
        width: 300px;
        background-color: aqua;
    }
    .postItemMainLeftContent{
        display: flex;
        flex-direction: column;
        background-color: white;
        padding: 35px;
        width: 500px;
        border-radius: 15px;
    }
    .postItemMainLeft{
        display: flex;
        flex-direction: column;
    }
    .postItemMain{
        display: flex;
        justify-content: center;
        margin-left: 5%;
        margin-right: 5%;
    }
    .postItemBackColor{
        display: flex;
        flex-direction: column;
        background-color: whitesmoke;
        padding: 50px 0;
    }
</style>