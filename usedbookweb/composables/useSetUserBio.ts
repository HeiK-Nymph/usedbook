export const useSetUserBio = async (newBio:string) => {
    const auth = useAuthStore()
    const pd = newBio.replace(/\s/g, '')
    if (pd.length === 0){
        newBio = '该用户太懒了，还没有设置简介'
    }
    newBio = newBio.trim()
    try{
        const data = await $fetch('/api/setUserBio',{
            method:'POST',
            body:{newUserBio:newBio, userId:auth.userId}
        }) as {res:string, tip:string}
        if (data.res === '1'){
            ElMessage.success({
                message:data.tip,
                offset:50
            })
            return
        }else{
            ElMessage.error({
                message:data.tip,
                offset:50
            })
            return
        }
    }catch(e){
        console.error(e)
        ElMessage.error({
            message:'上传失败',
            offset:50
        })
        return
    }
}