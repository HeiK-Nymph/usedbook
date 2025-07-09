// plugins/element-plus-icons.ts
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


export default defineNuxtPlugin((nuxtApp) => {
  // 全局注册所有图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    nuxtApp.vueApp.component(key, component)
  }
})