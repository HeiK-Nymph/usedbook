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
                <div class="pubComment">
                    <div class="pubCommentTip">
                        看帖是喜欢，评论才是真爱：
                    </div>
                    <div class="pubCommentInput">
                        <el-input
                        v-model="commentVal"
                        type="textarea"
                        :autosize="{ minRows: 4 }"
                        maxlength="300"
                        show-word-limit
                        resize="none"
                        >
                        </el-input>
                    </div>
                    <div class="pubCommentBto">
                        <el-button style="width: 90px; height: 35px;" type="primary" @click="handlePubComment">评论</el-button>
                    </div>
                </div>
                <div class="commentsContent">
                    <el-radio-group v-model="commentsModel">
                        <el-radio-button value="all">全部评论</el-radio-button>
                        <el-radio-button value="onlyAuthor">只看楼主</el-radio-button>
                    </el-radio-group>
                    <PostCommentItem v-for="comment in commentArr" :key="comment._id"
                    :selfId="auth.userId"
                    :comment = comment
                    />
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
    

    const userStatus = userData.value?.status
    const title = postData.value?.content.title
    const authorId = postData.value?.content.authorId._id
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

    const commentVal = ref("")
    async function handlePubComment(){
        try{
            const data = await $fetch('/api/upload/comment',{
                method:'POST',
                body:{
                    userId:auth.userId,
                    userStatus: userStatus,
                    postId:postId,
                    commentVal:commentVal.value
                }
            }) as {res:string, tip:string}
            if (data.res === '1'){
                ElMessage.success({
                    message:data.tip,
                    offset:50
                })
                commentVal.value = ""
            }else if (data.res === '4'){
                ElMessage.error({
                    message:data.tip,
                    offset:50
                })
                await navigateTo('/login')
            }else{
                ElMessage.error({
                    message:data.tip,
                    offset:50
                })
            }
        }catch(e){
            console.error(e)
            ElMessage.warning({
                message:'网络错误',
                offset:50
            })
        }
        await refreshPost()
    }

    const commentsModel = ref('all')
    const commentArr = computed(() => {
        if (commentsModel.value === 'all'){
            return postData.value?.content.comments
        }else{
            return postData.value?.content.comments.filter((p) => {
                return p.userId._id === authorId
            })
        }
    })


</script>
    
<style scoped>
    .commentsContent{
        margin-top: 15px;
        background-color: white;
        border-radius: 15px;
        padding: 15px;
    }
    .pubCommentBto{
        margin-top: 15px;
        display: flex;
        justify-content: flex-end;
    }
    .pubCommentInput{
        margin-top: 15px;
    }
    .pubCommentTip{
        font-size: 13px;
        color: darkgray;
    }
    .pubComment{
        background-color: white;
        border-radius: 15px;
        margin-top: 20px;
        padding: 30px;
        
        display: flex;
        flex-direction: column;
    }
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
        border-radius: 15px;
    }
    .postItemMainLeft{
        display: flex;
        flex-direction: column;
        width: 800px;
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