export const useSetUserName = async (CSuserName:string) => {
    const auth = useAuthStore()
    const userName = CSuserName.replace(/\s/g, '')
    if (!userName){
        ElMessage.warning({
            message:'输入不能为空',
            offset:50
        })
        return
    }
    try{
        const data = await $fetch('/api/setUserName',{
            method:'POST',
            body:{newUserName:userName, userId:auth.userId}
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