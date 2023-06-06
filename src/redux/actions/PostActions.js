import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../api/API'


// Generates pending, fulfilled and rejected action types 
// The first argument is the action type and the second one is async function which return promise
export const fetchAllPosts = createAsyncThunk('post/fetchAllPosts', (page) => {
    return api.fetchAllPosts(page).then((response) => response.data)
})

export const fetchPost = createAsyncThunk('post/fetchPost', (id) => {
    return api.fetchPost(id).then((response) => response.data)
})

// create a new post 
export const createPost = createAsyncThunk('post/createPost', (post) => {
    return api.createPost(post).then((response) => response.data)
})

// Delete Post
export const deletePost = createAsyncThunk('post/deletePost', (id) => {
    return api.deletePost(id).then((response) => response.data)
})

// like Post
export const likePost = createAsyncThunk('post/likePost', (id) => {
    return api.likePost(id).then((response) => response.data)
}) 

// get posts by search
export const getPostsBySearch = createAsyncThunk('post/getPostsBySearch', (searchQuery) => {
    return api.getPostsBySearch(searchQuery).then((response) => response.data)
}) 