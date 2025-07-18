<template>
    <div class="settingsMain">
        <div class="settingsTip">
            <span style="font-size: 30px; font-weight: bold;">账户设置</span>
            <span style="color: #8e8e95; overflow: hidden; white-space: nowrap;">您可以在此处设置您的账户信息</span>
        </div>
        <hr style="width: 100%;">
        <div class="settingsContent">
            <div class="settingsContentItem1">
                <div class="settingsContentItem1Left">
                    <span style="font-size: 25px;">头像</span> <br>
                    <span>这是您的头像设置</span>
                </div>
                
                <el-upload
                    action="/api/upload/avatar"
                    name="avatar"
                    :headers="{'X-User-ID':auth.userId}"
                    :auto-upload="true"
                    :accept="'.jpg, .jpeg .png'"
                    :before-upload="beforeUpload"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :show-file-list="false"
                    style="margin-left: auto; "
                >
                    <el-button type="primary" style="width: 250px">点击上传JPG图片</el-button>
                    <template #tip>
                        <div class="el-upload__tip">
                            只能上传jpg/jpeg/png格式图片，且不超过2MB
                        </div>
                    </template>
                </el-upload>
            </div>
            <div class="settingsContentItem2">
                <div class="settingsContentItem1Left">
                    <span style="font-size: 25px;">昵称</span> <br>
                    <span>这是您的昵称设置, 您的昵称是唯一的</span>
                </div>
                <el-input v-model="userName" size="large" minlength="1" maxlength="10" show-word-limit>
                    <template #prefix>
                        昵称：
                    </template>
                </el-input>
                <div class="tipAndBto">
                    <span style="font-size: 12px; color:#71717a">昵称长度最大为 10, 可以是任意字符</span>
                    <el-button type="primary" @click="setName">保存</el-button>
                </div>
            </div>
            <div class="settingsContentItem2">
                <div class="settingsContentItem1Left">
                    <span style="font-size: 25px;">签名</span> <br>
                    <span>这是您的签名设置, 您的签名将会被显示在您的主页上</span>
                </div>
                <el-input
                 v-model="userBio" type="textarea"
                 autosize
                 maxlength="100"
                 show-word-limit
                 resize="none"
                 
                 >
                </el-input>
                <div class="tipAndBto">
                    <span style="font-size: 12px; color:#71717a">签名最大长度为 100, 可以是任意字符</span>
                    <el-button type="primary" @click="setBio">保存</el-button>
                </div>
            </div>
            <div class="settingsContentItem2">
                <div class="settingsContentItem1Left">
                    <span style="font-size: 25px;">邮箱</span> <br>
                    <span>这是您的邮箱设置, 您的邮箱将会被用于恢复您的密码</span>
                    <span style="white-space: nowrap; overflow: hidden;">点击发送验证码, 您的新邮箱中将会收到一封包含验证码的邮件</span>
                </div>
                <el-input v-model="newEmail" size="large" placeholder="请输入您的新邮箱">
                    <template #prefix>
                        <el-icon><Message /></el-icon>
                    </template>
                </el-input>
                <el-input v-model="captcha" size="large" placeholder="新邮箱验证码" style="margin-top: 10px;">
                    <template #prefix>
                        <el-icon><Key /></el-icon>
                    </template>
                    <template #suffix>
                        <el-button>发送验证码</el-button>
                    </template>
                </el-input>
                <div class="tipAndBto">
                    <span style="font-size: 12px; color:#71717a">如果您的新邮箱未收到验证码, 请检查垃圾邮件或者全部邮件</span>
                    <el-button type="primary">保存</el-button>
                </div>
            </div>
            <div class="settingsContentItem2">
                <div class="settingsContentItem1Left">
                    <span style="font-size: 25px;">密码</span> <br>
                    <span>这这是您的密码设置, 您需要输入旧密码以更改新密码</span>
                </div>
                <el-input v-model="passwordForm.oldPassword" size="large" show-password @keydown.space.prevent>
                    <template #prefix>
                        旧密码：
                    </template>
                </el-input>
                <el-input v-model="passwordForm.newPassword" size="large"  style="margin-top: 10px;" maxlength="1000" show-word-limit show-password @keydown.space.prevent>
                    <template #prefix>
                        新密码：
                    </template>
                </el-input>
                <el-input v-model="passwordForm.pd" size="large"  style="margin-top: 10px;" maxlength="1000" show-word-limit show-password @keydown.space.prevent>
                    <template #prefix>
                        请确认：
                    </template>
                </el-input>
                <div class="tipAndBto">
                    <span style="font-size: 12px; color:#71717a; white-space: nowrap; overflow: hidden;">密码长度最短 6 个字符, 最长 1000 个字符，至少包含数字和英语字母</span>
                    <el-button type="primary" @click="changePassword">保存</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
    definePageMeta({
        middleware:['settings-check']
    })
    onBeforeMount(async ()=>{
        if (!await useCheckAuth()){
            await navigateTo('/')
        }
    })
    const auth = useAuthStore()
    function beforeUpload(file:File){
        const isImageValid = (file.type === 'image/jpeg' || file.type === 'image/png') || /\.(jpe?g|png)$/i.test(file.name)
        const siLt2M = file.size / 1024 / 1024 < 2
        if (!isImageValid){
            ElMessage.error({
                message:'上传的图片格式不正确',
                offset:50
            })
            return false
        }
        if (!siLt2M){
            ElMessage.error({
                message:'图片大小不能超过2MB',
                offset:50
            })
            return false
        }
        return true
    }
    function handleSuccess(res:Response){
        ElMessage.success({
            message:'上传成功',
            offset:50
        })
        auth.updated = !auth.updated
    }
    function handleError(){
        ElMessage.error({
            message:'上传失败',
            offset:50
        })
    }
    const userName = ref("")
    const userBio = ref("")
    const newEmail = ref("")
    const captcha = ref("")
    const passwordForm = ref({
        oldPassword:"",
        newPassword:"",
        pd:""
    })
    async function setName(){
        await useSetUserName(userName.value)
    }
    async function setBio(){
        await useSetUserBio(userBio.value)
    }
    async function changePassword(){
        if (passwordForm.value.newPassword !== passwordForm.value.pd){
            ElMessage.warning({
                message:'两次输入的密码不一样',
                offset:50
            })
            return
        }
        const res = await useChangePassword(passwordForm.value.oldPassword, passwordForm.value.newPassword)
        if (res){
            passwordForm.value.oldPassword = ""
            passwordForm.value.newPassword = ""
            passwordForm.value.pd = ""
        }
    }
</script>
    
<style scoped>
    .tipAndBto{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
    }
    .settingsContentItem2{
        border: 1px solid darkgray;
        box-shadow: 0 0 15px rgba(0,0,0,0.3);
        max-width: 500px;
        width: 100%;
        border-radius: 15px;
        padding: 10px 20px;
        display: flex;
        flex-direction: column;
    }
    .settingsContentItem1Left{
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }
    .settingsContentItem1{
        border: 1px solid darkgray;
        box-shadow: 0 0 15px rgba(0,0,0,0.3);
        display: flex;
        max-width: 500px;
        width: 100%;
        border-radius: 15px;
        padding: 10px 20px;
        align-items: center;
    }
    .settingsContent{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap:30px;
    }
    .settingsTip{
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-bottom: 20px;
    }
    .settingsMain{
        display: flex;
        flex-direction: column;
        margin-left: 5%;
        margin-right: 5%;
    }
</style>