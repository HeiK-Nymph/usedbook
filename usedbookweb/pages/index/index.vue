<template>
    <div class="indexMain">
        <div class="indexTop">
            <div class="indexTopLeft">
                <div class="indexTopLeftTop">
                    <div class="indexTopLeftTopItme1">
                        <el-icon color="blue" size="20"><MagicStick /></el-icon>
                        <span class="Item1Font">欢迎来到Cyuuko</span>
                    </div>
                    <div class="indexTopLeftTopItme2">
                        <span class="Item2Font">一站式二手书交流社区！</span>
                    </div>
                    <div class="indexTopLeftTopItme3">
                        <span class="Item3Font">免费，点对点的二手书资源交流社区</span>
                    </div>
                </div>
                <div class="indexTopLeftFoot">
                    <NuxtLink to="/tag" class="nuxtlink indexTopLeftFootItem1">
                        
                            <el-icon><PriceTag /></el-icon>
                            标签
                        
                    </NuxtLink>
                    <NuxtLink to="/doc" class="nuxtlink indexTopLeftFootItem2">
                        
                            <el-icon><Document /></el-icon>
                            文档
                        
                    </NuxtLink>
                </div>
            </div>
            <div class="indexTopRight">
                <el-carousel
                :interval="4000"
                
                height="350px"
                >
                <el-carousel-item v-for="(book, index) in featuredBooks" :key="index">
                    <div class="bookImg" style="background-image: url(/爱丽丝头像.png);">
                        {{ book.title }}
                    </div>
                    
                </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <button @click="cs">你好</button>
        <section>
            <IndexContent/>
        </section>
    </div>
</template>
    
<script setup lang='ts'>
import { ref } from 'vue';
import axios from 'axios';
    async function cs(){
        const { data } = await useFetch('/api/cs', {
        baseURL: 'http://localhost:8000' // 后端独立域名
    });
    }
    const featuredBooks = ref([
  {
    title: 'JavaScript高级程序设计',
    price: 68.00,
    author: 'Nicholas C. Zakas',
    image: 'https://img1.doubanio.com/view/subject/s/public/s8958650.jpg'
  },
  {
    title: 'Vue.js设计与实现',
    price: 89.00,
    author: '霍春阳',
    image: 'https://img9.doubanio.com/view/subject/s/public/s34351394.jpg'
  },
  {
    title: 'React进阶之路',
    price: 59.00,
    author: '徐超',
    image: 'https://img2.doubanio.com/view/subject/s/public/s29814021.jpg'
  },
  {
    title: 'TypeScript入门与实战',
    price: 79.00,
    author: '钟胜平',
    image: 'https://img3.doubanio.com/view/subject/s/public/s33642415.jpg'
  }
])
</script>
    
<style scoped>
    .bookImg{
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 10px;
        padding: 10px;
    }
    .indexTopRight{
        flex-grow: 1;
    }
    .indexTopLeftFootItem2{
        background-color: #dcf2e2;
        line-height: 40px;
        height: 40px;
        padding: 10px;
        width: 40%;
        text-align: center;
        border-radius: 20px;
        box-shadow: 0 2px 6px;
        font-weight: 800;
        font-size: 24px;
        color:#559464

    }
    .indexTopLeftFootItem2:hover{
        background-color: #e2f6e6;
    }
    .indexTopLeftFootItem1{
        background-color: #d4e3fc;
        line-height: 40px;
        height: 40px;
        padding: 10px;
        width: 40%;
        text-align: center;
        border-radius: 20px;
        box-shadow: 0 2px 6px;
        color:#4d7ed0;
        font-weight: 800;
        font-size: 24px;
    }
    .indexTopLeftFootItem1:hover{
        background-color: #dce8fd;
    }
    .nuxtlink{
        text-decoration: none;
        
    }
    .indexTopLeftFoot{
        display: flex;
        justify-content: space-between;
    }
    .Item3Font{
        color:#6b6976
    }
    .Item2Font{
        color:#4a49d7;
        font-weight: 1000;
        font-size: 40px;
        white-space: nowrap; 
    }
    .Item1Font{
        background-color: #b4c8f6;
        border-radius: 10px;
        padding: 4px 10px;
    }
    
    .indexTopLeftTopItme2{
        display: flex;
        align-items: center;
        flex-grow: 1;
    }
    .indexTopLeftTopItme1{
        color: blue;
        align-items: center;
        display: flex;
    }
    
    .indexTopLeftTop{
        height: 65%;
        color: #daf3e1;
        background-image: linear-gradient(135deg,#d5e2fb ,#daf3e1);
        border-radius: 20px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        
    }
    .indexTopLeft{
        display: flex;
        flex-direction: column;
        width: 50%;
        gap: 20px;
        justify-content: space-between;
        overflow: hidden;
        padding-bottom: 5px;
        padding-right: 5px;
    }
    
    .indexTop{
        display: flex;
        padding-bottom: 10px;
        height: 350px;
    }
    .indexMain{
        display: flex;
        flex-direction: column;
        height: 800px;
        margin-left: 5%;
        margin-right: 5%;
    }
</style>