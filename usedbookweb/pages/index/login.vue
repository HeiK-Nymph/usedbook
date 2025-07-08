<template>
    <div class="loginMain">
        <div class="content">
            <div class="logo">
                <img src="/favicon.ico"/>
                <span class="title">Cyuuko</span>
            </div>
            <div class="tip">
                登录
            </div>
            <div class="myForm">
                <el-form label-width="50" style="width: 400px;">
                    <el-form-item label="账号">
                        <el-input v-model="form.email" clearable placeholder="请输入邮箱账号" size="large"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.password" clearable placeholder="请输入密码" size="large" show-password></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <el-button type="primary" class="formPost" @click="loginBto">登录</el-button>
            <hr class="hr">
            <el-button class="reset">忘记密码</el-button>
            <div style="width: 400px;margin-top: 20px;">
                没有账号？
                <NuxtLink to="/register" style="text-decoration: none;" class="register">注册账号</NuxtLink>
            </div>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
    
    import { ref } from 'vue';
    import { useAuthStore } from '#imports';
    import { navigateTo } from '#imports';
    const auth = useAuthStore()
    const form = ref({
        email:"",
        password:""
    })
    async function loginBto(){
        if (form.value.email === "" || form.value.password === ""){
            ElMessage.warning('请输入账号或密码')
            return
        }
        try{
            const data = await $fetch('/api/login',{
                baseURL:'http://192.168.1.2:8000',
                method:'post',
                body:form.value
            }) as {res: String}
            const {res} = data
            if (res === '2'){
                ElMessage.error('账号或者密码错误')
            }
            else if (res === '1'){
                ElMessage.success('登录成功')
                // navigateTo('/')
            }
            else{
                ElMessage.error('未知错误')
            }
        }catch(err){
            console .error(err)
        }
        // const userInfo = {
        //     id:form.value.email,
        //     avatar:"",
        //     name:form.value.email
        // }
        // auth.login(userInfo)
        // console.log(localStorage.getItem('isLoggedIn'))
    }
</script>
    
<style scoped>
    .register{
        color: #54a0ff;
    }
    .register:hover{
        color:#7da1df
    }
    .reset{
        width:400px;
        height: 40px;
        border-color: #54a0ff;
        color: #54a0ff;
        border-width: 3px;
        border-radius: 15px;
    }
    .formPost{
        width: 400px;
        height: 40px;
        border-radius: 15px;
    }
    .hr{
        height: 1px;
        background-color: #dcdcdc;
        margin: 20px 0;
        width: 400px;
        border: none;
    }
    
    .tip{
        text-align: center;
        font-size: 30px;
        font-weight: 700;
        padding: 20px 0;
    }
    .title{
        cursor: default;
    }
    .logo{
        
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .content{
        width: 400px;
        border: 1px solid darkgrey;
        box-shadow: 0 0 15px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
        padding: 40px;
        align-items: center;
    }
    .loginMain{
        display: flex;
        justify-content: center;
        padding-top: 50px;
    }
</style>