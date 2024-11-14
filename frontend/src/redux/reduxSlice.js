import { createSlice } from "@reduxjs/toolkit";

const reduxSlice = createSlice({
    name: "auth",
    initialState: {
        auth: {
            user: null,
            suggestedUsers: [],
            userProfile: null
        },
        post: {
            posts: [],
            selectedPost: null
        }
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.auth.user = action.payload;
        },
        setSuggestedUsers: (state, action) => {
            state.auth.suggestedUsers = action.payload;
        },
        setUserProfile: (state, action) => {
            state.auth.userProfile = action.payload;
        },
        setPosts: (state, action) => {
            state.post.posts = action.payload;
        },
        setSelectedPost: (state, action) => {
            state.post.selectedPost = action.payload;
        }
    }
});

export const { setAuthUser, setSuggestedUsers, setUserProfile, setPosts, setSelectedPost } = reduxSlice.actions;

export default reduxSlice.reducer;
