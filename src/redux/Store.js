import { configureStore } from "@reduxjs/toolkit";
import PostSlice from "./slices/PostSlice";
import AuthSlice from "./slices/AuthSlice";


const Store = configureStore({
    reducer: {
        post: PostSlice, 
        auth: AuthSlice
    }
})

export default Store



