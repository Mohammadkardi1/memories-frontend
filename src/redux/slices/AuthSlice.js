import { createSlice } from "@reduxjs/toolkit"
import { loginUser, signupUser } from "../actions/AuthActions"
// import Cookies from 'js-cookie';


const initialState = {
    user: {}, 
    loading: false, 
    error: '',
    isLoggedin: false
}


const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginGoogle: (state, action) => {
            const { sub: token, ...rest } = action?.payload;
            localStorage.setItem('profile', JSON.stringify({ token, ...rest }))
            state.isLoggedin = true
        },
        logout: (state, action) => {
            localStorage.clear()
            document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
            state.isLoggedin = false
        },
        loginByToken: (state, action) => {
            state.user = JSON.parse(localStorage.getItem('profile'))
            state.isLoggedin = true
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            localStorage.setItem('profile', JSON.stringify({...action?.payload}))
            state.error = ''
            state.isLoggedin = true
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.user = {}
            state.error = action.error.message
        })



        builder.addCase(signupUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            localStorage.setItem('profile', JSON.stringify({...action?.payload}))
            state.error = ''
            state.isLoggedin = true
        })
        builder.addCase(signupUser.rejected, (state, action) => {
            state.loading = false
            state.user = {}
            state.error = action.error.message
        })

    }
})

export const AuthActions = AuthSlice.actions

export default AuthSlice.reducer
