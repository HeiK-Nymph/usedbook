<template>
    <div class="userIdmain">
        <div class="mainLeft">
            <div class="mainLeftAvatar">
                <el-avatar :src="avatarURL" style="height: 150px; width: 150px; border: 2px solid rgba(105, 105, 105, 0.2);"/>
            </div>
            <div class="mainLeftName">
                {{ userName }}
            </div>
            <div class="mainLeftRoles">
                <span v-if="roles === 'user'" class="roles">用户</span>
                <span v-else class="roles">管理员</span>
            </div>
            <div class="follow">
                <span class="followItem" @click="followersDialog = true"><el-icon color="darkgray"><User /></el-icon> {{ followersCnt }}人关注TA</span>
                <el-dialog v-model="followersDialog" width="550" :title="`关注${userName}的人`">
                    <UserFollows v-for="item in pageFollowers" :key="item._id"
                        :userId="item._id"
                        :avatarURL="item.avatar"
                        :userName="item.username"
                    />
                    <el-pagination layout="prev, pager, next, jumper" :page-size="pageSize" :total="followersCnt" background style="margin-top: 10px;" @current-change="handlePageFollowers"/>
                </el-dialog>
                <span class="followItem" @click="followingDialog = true"><el-icon color="darkgray"><IceDrink /></el-icon> {{ followingCnt }}人正在关注</span>
                <el-dialog v-model="followingDialog" width="550" :title="`${userName}正在关注的人`">
                    <UserFollows v-for="item in pageFollowing" :key="item._id"
                        :userId="item._id"
                        :avatarURL="item.avatar"
                        :userName="item.username"
                    />
                    <el-pagination layout="prev, pager, next, jumper" :page-size="pageSize" :total="followingCnt" background style="margin-top: 10px;" @current-change="handlePageFollowing"/>
                </el-dialog>
            </div>
            <div class="joinDate">
                <span class="joinDateItem"><el-icon><Calendar /></el-icon>加入于{{ userData?.meta.createAt }}</span>
            </div>
            <div class="mainLeftBio" style="margin: 30px 0 10px 0;">
                {{ userData?.bio }}
            </div>
            <hr style="width: 100%;">
            
            <div class="mainLeftFooter">
                <div class="mainLeftFooterEdit" v-if="auth.userId === route.params.userId">
                    <div style="width: 100%; display: flex; flex-direction: column;">
                        <el-button @click="toSettingsBto" type="primary" plain><el-icon><EditPen /></el-icon><span>编辑信息</span></el-button>
                    </div>
                    <div style="width: 100%; display: flex; flex-direction: column; margin-top: 10px;">
                        <el-button type="primary"><el-icon><Upload /></el-icon><span>发布帖子</span></el-button>
                    </div>
                </div>
                <div v-else>
                    <div @click="changleUnFollow" v-if="userData?.followers.some(follower => follower._id === auth.userId)" style="width: 100%; display: flex; flex-direction: column;">
                        <el-button type="primary" plain><el-icon><Select /></el-icon><span>已关注</span></el-button>
                    </div>
                    <div @click="changleAddFollow" v-else style="width: 100%; display: flex; flex-direction: column;">
                        <el-button type="primary" plain><el-icon><Plus /></el-icon><span>关注</span></el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="mainRight">
            <div class="mainRightHeader">
                <div class="mainRightHeaderItem">
                    <div class="mainRightHeaderItemLeft">
                        <el-icon><DocumentCopy /></el-icon>
                    </div>
                    <div class="mainRightHeaderItemRight">
                        <span class="mainRightHeaderItemRightNumber">{{ pubpostsCnt }}</span>
                        <span class="mainRightHeaderItemRightTip">发布帖子</span>
                    </div>
                </div>
                <div class="mainRightHeaderItem">
                    <div class="mainRightHeaderItemLeft">
                        <el-icon><ChatRound /></el-icon>
                    </div>
                    <div class="mainRightHeaderItemRight">
                        <span class="mainRightHeaderItemRightNumber">{{ commentsCnt }}</span>
                        <span class="mainRightHeaderItemRightTip">评论</span>
                    </div>
                </div>
                <div class="mainRightHeaderItem">
                    <div class="mainRightHeaderItemLeft">
                        <el-icon><ChatDotSquare /></el-icon>
                    </div>
                    <div class="mainRightHeaderItemRight">
                        <span class="mainRightHeaderItemRightNumber">{{ messagesCnt }}</span>
                        <span class="mainRightHeaderItemRightTip">消息</span>
                    </div>
                </div>
                <div class="mainRightHeaderItem">
                    <div class="mainRightHeaderItemLeft">
                        <el-icon><Star /></el-icon>
                    </div>
                    <div class="mainRightHeaderItemRight">
                        <span class="mainRightHeaderItemRightNumber">{{ favopostsCnt }}</span>
                        <span class="mainRightHeaderItemRightTip">收藏</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <button @click="cs">测试</button>
    <NuxtPage/>
</template>
    
<script setup lang='ts'>
    definePageMeta({
        middleware:['userid-check']
    })
    onBeforeMount(async ()=>{
        await useCheckAuth()
    })
    import { baseURL } from '#imports'
    const auth = useAuthStore()
    const route = useRoute()
    import { type userInfo } from '~/types';
    const {data:userData, refresh:refreshUser} = await useAsyncData<userInfo>(`userInfo-${route.params.userId}`,() => $fetch('/api/getUserInfo',{
        method:'POST',
        body:{userId: route.params.userId}
    }))
    if (!userData.value){
        navigateTo('/')
    }
    const avatarURL = computed(() => baseURL + "/api" + userData.value?.avatar)
    const userName = computed(() => userData.value?.username)
    const roles = computed(() => userData.value?.roles)
    const followersCnt = computed(() => userData.value?.followers.length)
    const followingCnt = computed(() => userData.value?.following.length)
    const pubpostsCnt = computed(() => userData.value?.pubposts.length)
    const commentsCnt = computed(() => userData.value?.comments.length)
    const messagesCnt = computed(() => userData.value?.messages.length)
    const favopostsCnt = computed(() => userData.value?.favoposts.length)


    const followersDialog = ref(false)
    const followingDialog = ref(false)

    const currentFollowersPage = ref(1)
    const pageSize = 5
    const pageFollowers = computed(() => {
        if (followersCnt.value === 0){
            return []
        }
        const start = (currentFollowersPage.value - 1) * pageSize
        const end = start + pageSize
        return userData.value?.followers.slice(start, end)
    })
    const handlePageFollowers = (newPage: number) => {
        currentFollowersPage.value = newPage
    }

    const currentFollowingPage = ref(1)
    const pageFollowing = computed(() => {
        if (followingCnt.value === 0){
            return []
        }
        const start = (currentFollowingPage.value - 1) * pageSize
        const end = start + pageSize
        return userData.value?.following.slice(start, end)
    })
    const handlePageFollowing = (newPage: number) => {
        currentFollowingPage.value = newPage
    }

    async function changleUnFollow(){
        try{
            const data = await $fetch('/api/unFollow',{
                method:'POST',
                body:{selfUserId:auth.userId, otherUserId:userData.value?._id}
            }) as {res:string}
            if (data.res === '1'){
                ElMessage.success({
                    message:'已取消关注',
                    offset:50
                })
            }
        }catch(e){
            console.error(e)
        }
        refreshUser()
    }
    async function changleAddFollow(){
        try{
            const data = await $fetch('/api/addFollow',{
                method:'POST',
                body:{selfUserId:auth.userId, otherUserId:userData.value?._id}
            }) as {res: string}
            if (data.res === '1'){
                ElMessage.success({
                    message:'关注成功',
                    offset:50
                })
            }
        }catch(e){
            console.error(e)
        }
        refreshUser()
    }

    async function toSettingsBto(){
        await navigateTo('/settings')
    }

    async function cs(){
        console.log(userData.value?.following)
    }
    
</script>
    
<style scoped>
    .mainRightHeaderItemRightTip{
        color:#9d9da3;
        font-size: 14px;
        white-space: nowrap;
    }
    .mainRightHeaderItemRightNumber{
        font-size: 25px;
        font-weight: bold;
    }
    .mainRightHeaderItemRight{
        display: flex;
        flex-direction: column;
    }
    .mainRightHeaderItemLeft{
        font-size: 35px;
        color:#2a72ee;
        margin-right: 10px;
    }
    .mainRightHeaderItem{
        border: 1px solid darkgray;
        box-shadow: 0 0 15px rgba(0,0,0,0.3);
        display: flex;
        padding:10px 20px;
        max-width: 150px;
        width: 100%;
        border-radius: 20px;
    }
    .mainRightHeader{
        display: flex;
        justify-content: space-around;
    }
    .mainRight{
        border:1px solid blue;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
    .mainLeftFooterEdit{
        display: flex;
        flex-direction: column;
    }
    
    .joinDateItem{
        color: gray;
        display: flex;
        align-items: center;
    }
    .joinDate{
        display: flex;
        justify-content: center;
    }
    .followItem{
        height: 35px;
        line-height: 35px;
        padding: 0 15px;
        border-radius: 10px;
        white-space: nowrap;
    }
    .followItem:hover{
        background-color: #eeeeef;
        cursor:pointer;
    }
    .follow{
        display: flex;
        justify-content: space-evenly;
    }
    .roles{
        background-color: #d4e3fc;
        color: #215ec4;
        border-radius: 10px;
        padding: 0 5px;
        font-size: 15px;
    }
    .mainLeftRoles{
        text-align: center;
    }
    .mainLeftName{
        text-align: center;
        font-size: 25px;
        font-weight: bold;
        
    }
    .mainLeftAvatar{
        display: flex;
        justify-content: center;
        
        margin-top: 30px;
    }
    .mainLeft{
        border: 1px solid darkgray;
        box-shadow: 0 0 15px rgba(0,0,0,0.3);
        border-radius: 20px;
        width: 400px;
        display: flex;
        flex-direction: column;
        padding: 0 20px;
        padding-bottom: 80px;
    }
    .userIdmain{
        margin-top: 20px;
        border: 1px solid red;
        margin-left: 5%;
        margin-right: 5%;
        display: flex;
        
    }
</style>