import axios from 'axios';

// const url = 'http://localhost:5000/posts';

const API = axios.create({baseURL:'https://my-personal-blog-xk6w.onrender.com/'})

API.interceptors.request.use(req => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req
})

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page)=> API.get(`/posts?page=${page}`);
export const fetchPostBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost)=> API.post('/posts',newPost);
export const updatePost = (id,updatePostData) => API.patch(`/posts/${id}`,updatePostData);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value,id)=>API.post(`/posts/${id}/commentPost`, {value});

export const signin = (formData)=>API.post('/users/signin',formData);
export const signup = (formData)=>API.post('/users/signup',formData);