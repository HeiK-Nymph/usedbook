export const useChangePassword = async (oldPassword:string, newPassword:string) => {
    const auth = useAuthStore()
    if (!newPassword || !oldPassword){
        ElMessage.warning({
            message:'输入不能为空',
            offset:50
        })
        return false // 返回的false代表不重置输入框， true则为重置输入框
    }
    if (newPassword.length < 6){
        ElMessage.warning({
            message:'密码长度不能少于6位',
            offset:50
        })
        return false
    }
    const hasNumber = /\d/.test(newPassword);
    const hasLetter = /[a-zA-Z]/.test(newPassword);
    if (!hasNumber || !hasLetter){
        ElMessage.warning({
            message:'密码必须包含数字和字母',
            offset:50
        })
        return false
    }
    try{
        const data = await $fetch('/api/changePassword', {
            method:'POST',
            body:{oldPassword:oldPassword, newPassword:newPassword, userId:auth.userId}
        }) as {res:string, tip:string}
        if (data.res === '1'){
            ElMessage.success({
                message:data.tip,
                offset:50
            })
            await useLogout()
            return true
        }else{
            ElMessage.error({
                message:data.tip,
                offset:50
            })
            return true
        }
    }catch(e){
        console.error(e)
        ElMessage.error({
            message:'上传失败',
            offset:50
        })
        return true
    }
}