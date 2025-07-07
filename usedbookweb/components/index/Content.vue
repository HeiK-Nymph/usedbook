<template>
    <div class="header">
        <span class="font">最新发布：</span>
        <NuxtLink to="/usedbooks" style="text-decoration: none; color: #5680d9;" class="font2">
            <span >查看更多<el-icon><ArrowRight /></el-icon></span>
        </NuxtLink>
    </div>
    <div class="bookGrid">
        <NuxtLink :to="{path:'/' + book._id}" v-for="book in books" :key="book._id" class="bookItem">
            {{ book.title }}
        </NuxtLink>
    </div>
</template>
    
<script setup lang='ts'>
const books = ref([
  { _id: '1', title: 'JavaScript高级编程' },
  { _id: '2', title: 'Vue3实战指南' },
  { _id: '3', title: 'React实战精解' },
  { _id: '4', title: 'TypeScript入门' },
  { _id: '5', title: 'Node.js开发指南' },
  { _id: '6', title: '前端工程化实践' },
  { _id: '7', title: 'CSS权威指南' },
  { _id: '8', title: 'Web性能优化' }
])
</script>
    
<style scoped>
    .bookGrid{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
    }
    @media (max-width:768px){
        .bookGrid{
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media (max-width:480px) {
        .bookGrid{
            grid-template-columns: repeat(1, 1fr);
        }
    }
    .header{
        display: flex;
        gap: 20px;
    }
    .font2{
        height: 25px;
        line-height: 25px;
        padding: 5px 10px;
        border-radius: 10px;
    }
    .font2:hover{
        background-color: #d4e3fc;
    }
    .font{
        font-size: 24px;
        font-weight: 700;
        height: 30px;
        line-height: 30px;
    }
</style>