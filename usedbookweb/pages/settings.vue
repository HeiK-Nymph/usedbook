<template>
    <div class="settingsMain">
        <div class="settingsTip">
            <span style="font-size: 30px; font-weight: bold;">账户设置</span>
            <span style="color: #8e8e95; overflow: hidden; white-space: nowrap;">您可以在此处设置您的账户信息</span>
        </div>
        <hr style="width: 100%;">
        <div class="settingsContent">
            <div class="settingsContentItem">
                <div>
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
</script>
    
<style scoped>
    .settingsContentItem{
        border: 1px solid darkgray;
        box-shadow: 0 0 15px rgba(0,0,0,0.3);
        display: flex;
        max-width: 500px;
        width: 100%;
        border-radius: 15px;
        padding: 10px 20px;
    }
    .settingsContent{
        display: flex;
        flex-direction: column;
        align-items: center;
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
        border: 1px solid red;
        margin-left: 5%;
        margin-right: 5%;
    }
</style>