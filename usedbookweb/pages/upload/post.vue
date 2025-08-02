<template>
    <div class="uploadPostMain">
        <div class="tip">发布帖子（需要审核）</div>
        <hr style="width: 100%;">
        <div class="uploadPostContent">
            <div class="itemInput">
                <div style="width: 100px;">标题：</div>
                <el-input v-model="postTitle" placeholder="标题（必填）" size="large" maxlength="20" show-word-limit/>
            </div>
            <div class="itemInput">
                <div style="width: 100px;">标签：</div>
                <el-input v-model="postTag" placeholder="标签请用#开头的格式来添加，可以添加多个标签，最多五个标签，错误格式不识别" size="large" maxlength="100" show-word-limit/>
            </div>
            <Editor ref="editorRef"/>
            <div class="pubBto">
                <el-button @click="pub" type="primary" style="width: 200px; height: 35px;">发布</el-button>
            </div>
        </div>
        
    </div>
</template>
    
<script setup lang='ts'>
    definePageMeta({
        middleware:['pubpost-check']
    })
    onBeforeMount(async ()=>{
        if (!await useCheckAuth()){
            await navigateTo('/')
        }
    })
    const postTitle = ref("")
    const postTag = ref("")
    const editorRef = ref(); 
    async function pub(){
        if (!editorRef.value){
            return
        }
        const content = editorRef.value.getHtml()
        await ussePubPost(editorRef.value.getPostId(), postTitle.value, postTag.value, content)
    }
</script>
    
<style scoped>
    .pubBto{
        display: flex;
        justify-content: center;

    }
    .itemInput{
        display: flex;
        align-items: center;
        margin-bottom: 50px;
    }
    .uploadPostContent{
        padding: 20px 50px;
    }
    .tip{
        margin-left: 20px;
        font-size: 20px;
        font-weight: bold;
    }
    .uploadPostMain{
        display: flex;
        flex-direction: column;
        margin-left: 15%;
        margin-right: 15%;
        border: 1px solid darkgray;
        box-shadow: 0 0 15px rgba(0,0,0,0.3);
        border-radius: 15px;
        padding: 10px 0;
    }
</style>