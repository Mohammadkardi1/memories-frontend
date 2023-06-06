import { createSlice } from '@reduxjs/toolkit'
import { fetchAllPosts, 
            fetchPost,
            createPost, 
            deletePost, 
            likePost, 
            getPostsBySearch } from '../actions/PostActions';


const initialState = {
    posts: [],
    post: [],
    loading: false,
    error: ''
}

const PostSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            const { loading } = action?.payload;
            state.loading = loading
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllPosts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload
            state.error = ''
        })
        builder.addCase(fetchAllPosts.rejected, (state, action) => {
            state.loading = false
            state.posts = []
            state.error = action.error.message
        })


        builder.addCase(fetchPost.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchPost.fulfilled, (state, action) => {
            state.loading = false
            state.post = action.payload.data
            state.error = ''
        })
        builder.addCase(fetchPost.rejected, (state, action) => {
            state.loading = false
            state.post = []
            state.error = action.error.message
        })


        builder.addCase(createPost.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.loading = false
            state.posts.data.unshift(action.payload.data)
            state.error = ''
        })
        builder.addCase(createPost.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })


        builder.addCase(deletePost.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.loading = false
            state.posts.data = state.posts.data.filter(item => item._id !== action.payload.data._id)
            state.error = ''
        })
        builder.addCase(deletePost.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })


        builder.addCase(likePost.pending, (state) => {
            state.loading = true
        })
        builder.addCase(likePost.fulfilled, (state, action) => {
            state.loading = false
            state.posts.data = state.posts.data.map((post) => {
                if (post._id === action.payload.data._id ) {
                    return action.payload.data
                } else {
                    return post
                }
            })
            state.error = ''
        })
        builder.addCase(likePost.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })


        builder.addCase(getPostsBySearch.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getPostsBySearch.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload
            state.error = ''
        })
        builder.addCase(getPostsBySearch.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
});

export const postActions = PostSlice.actions

export default PostSlice.reducer