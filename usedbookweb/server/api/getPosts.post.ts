import { baseURL } from "~/composables/constants";
import { type Tposts } from "~/types";


export default defineEventHandler(async (event) => {
    try{
        const page = await readBody(event)
        const data = await $fetch<Tposts>('/api/getPosts',{
            method:'POST',
            baseURL:baseURL,
            body:page
        })
        return data
    }catch(e){
        console.error(e)
        return {
            res:'2',
            tip:'获取数据失败',
            content:[]
        }
    }
})