import axios from "axios";


export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})


// export const fetcher = async (url) => {
//     const response = await api.get(url);
//     return response.data;
// }