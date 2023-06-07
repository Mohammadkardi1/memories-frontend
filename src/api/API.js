import axios from 'axios'


const API = axios.create({baseURL: 'https://memories-api-zeta.vercel.app'})

// add the following headers to each outgoing HTTP request
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})


export const fetchAllPosts = (page) => API.get(`/api/posts?page=${page}`)
export const fetchPost = (id) => API.get(`/api/posts/getPost/${id}`)
export const getPostsBySearch = (searchQuery) => API.get(`/api/posts/search?searchQuery=${searchQuery || 'none'}`)


export const createPost = (post) => API.post('/api/posts', post)
export const deletePost = (id) => API.delete(`/api/posts/${id}`)
export const likePost = (id) => API.patch(`/api/posts/${id}`)


export const loginUser = (userInfo) => API.post('/api/auth/login', userInfo)
export const signupUser = (userInfo) => API.post('/api/auth/signup', userInfo)