<template>
    <div class="head">
        <div class="headCenter">
            <div class="headCenterLeft">
                <NuxtLink to="/" class="nuxtlink">
                    <div class="headCenterLeftTitle">
                        <img src="/favicon.ico"/>
                        <span class="title">Cyuuko</span>
                    </div>
                </NuxtLink>
                <ul>
                    <li>
                        <NuxtLink to="/usedbooks" :class="{ active: $route.path === '/usedbooks', nuxtlink: $route.path !== '/usedbooks', overFlow:true }" >
                            所有二手书
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/tag" :class="{ active: $route.path === '/tag', nuxtlink: $route.path !== '/tag',overFlow:true }">
                            二手书标签
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/doc" :class="{ active: $route.path === '/doc', nuxtlink: $route.path !== '/doc',overFlow:true }">
                            帮助文档
                        </NuxtLink>
                    </li>
                </ul>
            </div>
            <div class="headCenterRight">
                <el-tooltip content="搜索书籍" placement="bottom" :show-after="200" :hide-after="0" >
                    <NuxtLink to="/search" class="nuxtlink">
                        <div class="headCenterRightItem">
                            <el-icon size="30" color="#71717a"><Search /></el-icon>
                        </div>
                    </NuxtLink>
                </el-tooltip>
                <template v-if="auth.isLoggedIn">
                    <el-tooltip content="我的消息" placement="bottom" :show-after="200" :hide-after="0">
                        <NuxtLink to="/message" class="nuxtlink">
                            <div class="headCenterRightItem">
                                <el-icon size="30" color="#71717a"><Message /></el-icon>
                            </div>
                        </NuxtLink>
                    </el-tooltip>
                    <el-popover
                    placement="bottom-end"
                    trigger="hover"
                    :width="200"
                    >
                        <template #reference>
                            <NuxtLink to="/user/894" class="nuxtlink" style="height: 60px;">
                                <el-avatar src="/爱丽丝头像.png" class="cursor-pointer" style="--size: 90%; height: var(--size); width: auto;"  />
                            </NuxtLink>
                        </template>
                        <div class="user-menu">
                            <NuxtLink to="/user/894" class="nuxtlink menuItem">
                                <el-icon><User /></el-icon>
                                用户主页
                            </NuxtLink>
                            <div class="logOff" @click="logoutBto">
                                <el-icon><ArrowLeftBold /></el-icon>
                                退出登录
                            </div>
                        </div>
                    </el-popover>
                </template>
                <template v-else>
                    <el-tooltip content="登录/注册" placement="bottom" :show-after="200" :hide-after="0">
                        <NuxtLink to="/login" class="nuxtlink">
                            <div class="headCenterRightItem">
                                <el-icon size="30" color="#71717a"><User /></el-icon>
                            </div>
                        </NuxtLink>
                    </el-tooltip>
                </template>
            </div>
        </div>
    </div>
    <NuxtPage class="fenGe"/>
</template>
    
<script setup lang='ts'>
    import { useAuthStore } from '~/stores/auth';
    const auth = useAuthStore()
    function logoutBto(){
        auth.logout()
    }
</script>
    
<style scoped>
    .overFlow{
        white-space: nowrap; 
        overflow: hidden;
    }
    .fenGe{
        margin-top: 60px;
    }
    .active{
        text-decoration: none;
        color: #6c9ef3;
        font-weight: bold;
    }
    .headCenterRightItem{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        width: 60px;
    }
    .headCenterRightItem:hover{
        background-color: #eeeeef;
    }
    .logOff{
        cursor: pointer;
        padding: 3px;
        border-radius: 8px;
    }
    .logOff:hover{
        background-color: #e70b5d;
        color: white;
    }
    .menuItem{
        padding: 3px;
        border-radius: 8px;
    }
    .menuItem:hover{
        background-color: #d4d4d8;
    }
    .cursor-pointer{
        cursor: pointer;
    }
    .user-menu {
        display: flex;
        flex-direction: column;
    }
    .nuxtlink{
        text-decoration: none;
        color: inherit;
    }
    .title{
        font-weight: bold;
    }
    .headCenterLeft{
        display: flex;
        width: 400px;
        align-items: center;
        justify-content: space-between;
    }
    .headCenterLeft ul {
        list-style: none; /* 移除默认的项目符号 */
        display: flex; /* 将列表项横向排列 */
        gap: 20px; /* 列表项之间的间距 */
        padding: 0; /* 移除默认的内边距 */
        margin: 0; /* 移除默认的外边距 */
    }
    .headCenterLeftTitle{
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 17px;
    }
    .headCenterRight{
        display: flex;
        width: 250px;
        align-items: center;
        justify-content: space-between;
    }
    .headCenter{
        display: flex;
        width: 78%;
        justify-content: space-between;
    }
    .head{
        position: fixed;
        justify-content: center;
        top: 0;
        width: 100%;
        z-index: 9999;
        display: flex;
        height: 60px;
        background-color: rgba(255, 255, 255, 0.8); /* 半透明背景 */
        backdrop-filter: blur(10px); /* 模糊效果 */
    }
</style>