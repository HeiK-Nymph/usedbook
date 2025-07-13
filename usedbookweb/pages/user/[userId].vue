<template>
    <div class="userIdmain">
        <div class="mainLeft">
            <div class="mainLeftAvatar">
                <el-avatar :src="avatarURL" style="height: 150px; width: auto; border: 2px solid rgba(105, 105, 105, 0.2);"/>
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
            <hr style="width: 100%;">
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
    interface follow{
        _id:string;
        avatar:string;
        username:string;
    }
    interface userInfo{
        avatar:string;
        username:string;
        roles:string;
        followers:Array<follow>;
        following:Array<follow>;
        meta:{
            createAt:String;
            pdateAt:String;
            lastLogin:String;
        }
    }
    const {data:userData, refresh:refreshUser} = await useAsyncData<userInfo>(`userInfo-${route.params.userId}`,() => $fetch('/api/getUserInfo',{
        method:'POST',
        body:{userId: route.params.userId}
    }))
    const avatarURL =  baseURL + "/api/" + userData.value?.avatar
    const userName = userData.value?.username
    const roles = userData.value?.roles
    const followersCnt = userData.value?.followers.length
    const followingCnt = userData.value?.following.length

    const followersDialog = ref(false)
    const followingDialog = ref(false)

    const currentFollowersPage = ref(1)
    const pageSize = 5
    const pageFollowers = computed(() => {
        if (followersCnt === 0){
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
        if (followingCnt === 0){
            return []
        }
        const start = (currentFollowingPage.value - 1) * pageSize
        const end = start + pageSize
        return userData.value?.following.slice(start, end)
    })
    const handlePageFollowing = (newPage: number) => {
        currentFollowingPage.value = newPage
    }

    async function cs(){
        console.log(userData.value?.following)
    }
    
</script>
    
<style scoped>
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
    }
    .userIdmain{
        
        border: 1px solid red;
        margin-left: 5%;
        margin-right: 5%;
        display: flex;
        
    }
</style>