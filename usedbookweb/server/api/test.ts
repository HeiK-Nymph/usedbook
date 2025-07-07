import axios from "axios"

export default defineEventHandler(async () => {
    return await axios.get('/api/test')
})