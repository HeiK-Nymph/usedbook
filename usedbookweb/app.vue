<template>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
</template>
  
<script setup lang='ts'>
  useSeoMeta({
    title:'二手书交流站',
    description:'二手书交流站是一个练手的web项目，但不影响它对于正常功能的实现',
    keywords:'ershoushu, 二手书, 广东药科大学二手书, 二手书交易, 二手书处理, 二手书购买'
  })
  const route = useRoute()
const isErrorPage = computed(() => route.path === '/error')
</script>
  
<style scoped>
  
</style>