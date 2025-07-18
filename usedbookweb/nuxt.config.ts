// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  
  devtools: { enabled: true },
  modules:[
    '@element-plus/nuxt',
    '@pinia/nuxt',
  ],
  elementPlus:{
    globalConfig:{
      zIndex:10000,
    },
    defaultLocale:'zh-cn'
  }
})