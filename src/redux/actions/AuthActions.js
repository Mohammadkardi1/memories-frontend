import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../api/API'


export const loginUser = createAsyncThunk('auth/loginUser', (userInfo) => {
    return api.loginUser(userInfo).then((response) => response.data)
})

// create a new post 
export const signupUser = createAsyncThunk('auth/signupUser', (userInfo) => {
    return api.signupUser(userInfo).then((response) => response.data)
})