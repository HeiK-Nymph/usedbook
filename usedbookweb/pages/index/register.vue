<template>
    <div class="loginMain">
        <div class="content">
            <div class="logo">
                <img src="/favicon.ico"/>
                <span class="title">Cyuuko</span>
            </div>
            <div class="tip">
                注册
            </div>
            <div class="myForm">
                <el-form label-width="55" style="width: 400px;">
                    <el-form-item label="账号">
                        <el-input v-model="form.email" clearable placeholder="请输入邮箱账号" size="large"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.password" clearable placeholder="请输入密码" size="large" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="验证码">
                        <el-input v-model="form.captcha" clearable placeholder="请输入验证码" size="large" ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div style="width: 400px; margin-bottom: 10px; display: flex;">
                <el-checkbox-group v-model="isAgree">
                    <el-checkbox value="1">
                        我同意
                        <NuxtLink to="/doc/notice/privacy" style="text-decoration: none;">
                            用户协议
                        </NuxtLink>
                    </el-checkbox>
                </el-checkbox-group>
                
            </div>
            <el-button type="primary" class="formPost" @click="registerBto">注册</el-button>
            <hr class="hr">
            <el-button class="reset">忘记密码</el-button>
            <div style="width: 400px;margin-top: 20px;">
                已经有账号了？
                <NuxtLink to="/login" style="text-decoration: none;" class="register">立即登录</NuxtLink>
            </div>
        </div>
        
    </div>
</template>
    
<script setup lang='ts'>
    import { ref } from 'vue';
    import { navigateTo } from '#app';
    const form = ref({
        email:"",
        password:"",
        captcha:""
    })
    const isAgree = ref([])
    async function registerBto(){
        if (isAgree.value.length === 0) {
            ElMessage.warning('请先同意用户协议')
            return
        }
        if (form.value.email === "" || form.value.password === ""){
            ElMessage.warning('请输入账号或密码')
            return
        }
        if (form.value.captcha === ""){
            ElMessage.warning('请输入验证码')
            return
        }
        try{
            const data = await $fetch('/api/register',{
                baseURL:'http://192.168.1.2:8000',
                method:'post',
                body:form.value
            }) as {res: String}
            if (data.res === '1'){
                navigateTo('/login')
            }
            else if (data.res === '2'){
                ElMessage.error('验证码错误')
            }
            else if (data.res === '4'){
                ElMessage.error('邮箱已存在')
            }
            else{
                ElMessage.error('未知错误')
            }
        }catch(err){
            console.error(err)
        }
        
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