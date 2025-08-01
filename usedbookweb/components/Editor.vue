<template>
  <div class="py-5px">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" mode="default" />
    <Editor style="height: 500px; overflow-y: hidden" v-model="valueHtml" :defaultConfig="editorConfig" mode="default" @onCreated="handleCreated" />
  </div>
</template>
 
<script setup>
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { baseURL } from "#imports";
import "@wangeditor/editor/dist/css/style.css"; // 引入样式

const auth = useAuthStore()

// ✅ 只在客户端导入组件（Vue 会识别为异步组件）
const { Editor, Toolbar } = await import("@wangeditor/editor-for-vue");

const editorRef = shallowRef(); // 编辑器实例
const valueHtml = ref("<p></p>"); // 内容 HTML




const toolbarConfig = {};
const editorConfig = {  MENU_CONF: {}};

const postId = ref("")
const uploadHeaders = reactive({
  'X-User-ID': auth.userId,
  'X-Post-ID': postId.value // 初始值
});
watch(postId, (newPostId) => {
  uploadHeaders['X-Post-ID'] = newPostId; // 动态更新
});



 editorConfig.MENU_CONF["uploadImage"] = {
  // 上传图片的配置
  server: "/api/upload/postImg",
  fieldName: "image", //这个是参数名字
  headers: uploadHeaders,
  
  customInsert(res, insertFn) { //这个是获取接口返回的数据
    console.log(editorRef.value.getHtml())
    if (res.errno === 0){
        postId.value = res.data.postId
        insertFn(baseURL + "/api" + res.data.url) // 从 res 中找到 url（也就是接口返回的图片地址），然后插入图片
    }else if(res.errno === 2){
      postId.value = res.data.postId
      ElMessage.error({
            message:res.data.tip,
            offset:50
        })
    }
    else{
        ElMessage.error({
            message:res.data.tip,
            offset:50
        })
    }
  },
};

  const getHtml = ()=>{
    return editorRef.value.getHtml()
  }
  const getPostId = ()=>{
    return postId.value
  }
  defineExpose({
    getHtml, getPostId
  })

// 组件销毁时，销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor) editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例
};

</script>