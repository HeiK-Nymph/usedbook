export const ussePubPost = async (postId:string, CStitle:string, CStag:string, content:string) => {
    const auth = useAuthStore()
    const title = CStitle.replace(/\s/g, '')
    if (!title){
        ElMessage.warning({
            message:'标题不能为空',
            offset:50
        })
        return
    }
    const tags = CStag.replace(/\s/g, '').replace(/#+/g, '#').split('#').filter(tag => tag !== '').map(tag => `#${tag}`)
    try{
        const data = await $fetch('/api/upload/post',{
            method:'POST',
            body:{
                userId:auth.userId,
                postId:postId,
                title:title,
                tags:tags,
                content:content
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
        await navigateTo('/')
    }catch(e){
        console.error(e)
        ElMessage.error({
            message:'上传失败',
            offset:50
        })
        return
    }
}