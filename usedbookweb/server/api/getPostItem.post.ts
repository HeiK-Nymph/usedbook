import { baseURL } from "~/composables/constants";
import { type TpostItem } from "~/types";

export default defineEventHandler(async (event) => {
    try{
        const postId = await readBody(event)
        const data = await $fetch<TpostItem>('/api/getPostItem', {
            method:'POST',
            baseURL:baseURL,
            body:postId
        })
        return data
    }catch(e){
        console.error(e)
        return null
    }
})