import axios from 'axios';

// const url = 'http://localhost:5000/posts';

const API = axios.create({baseURL:'http://localhost:5000'})

export const fetchPosts = ()=> API.get('/posts');
export const createPost = (newPost)=> API.post('/posts',newPost);
export const updatePost = (id,updatePostData) => API.patch(`/posts/${id}`,updatePostData);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signin = (formData)=>API.post('/users/signin',formData);
export const signup = (formData)=>API.post('/users/signup',formData);