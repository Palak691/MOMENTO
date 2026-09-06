import { createSlice } from "@reduxjs/toolkit"
import { addComment, createPost, decrementPostLikes, getAllPosts, getCommentsByPost, incrementPostLikes } from "../../action/postAction"

const initialState = {
    posts : [],
    post : null,
    comments : [],
    likes : null,
    isError : false,
    isSuccess : false,
    isLoading  : false,
    isCommentsLoading: false,
    message : '',

}



const postSlice =  createSlice({
     name  : 'posts',
        initialState,
        reducers : {
            reset : ()=> initialState,
            clearMessage : (state)=>{
                state.message = ''
            }
        },
    extraReducers : (builder)=>{
     builder
     .addCase(getAllPosts.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        })

        .addCase(getAllPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.posts = action.payload.allPosts;
        })

        .addCase(getAllPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload?.message || "Failed to fetch posts";
        })
        .addCase(createPost.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.message = "Uploading post...";
        })
        .addCase(createPost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = action.payload;
        })
        .addCase(createPost.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload?.message || "Failed to create post";
        })
        .addCase(addComment.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.message = "Adding comment...";
        })

        .addCase(addComment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.comments.push(action.payload.comment);
            state.message = action.payload.message;
        })

        .addCase(addComment.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload?.message || "Failed to add comment";
        })
        .addCase(incrementPostLikes.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(incrementPostLikes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.likes = action.payload.likesCount;
            state.message = action.payload.message;
        })

        .addCase(incrementPostLikes.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload?.message || "Failed to like post";
        })

        .addCase(decrementPostLikes.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })

        .addCase(decrementPostLikes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.likes = action.payload.likesCount;
            state.message = action.payload.message;
        })

        .addCase(decrementPostLikes.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload?.message || "Failed to unlike post";
        })
        .addCase(getCommentsByPost.pending, (state) => {
         state.isCommentsLoading = true;
       state.isError = false;
        })

       .addCase(getCommentsByPost.fulfilled, (state, action) => {
       state.isCommentsLoading = false;
         state.isError = false;
         state.comments = action.payload.comments;
        })
     .addCase(getCommentsByPost.rejected, (state, action) => {
        state.isCommentsLoading = true;
        state.isError = true;
        state.message =
       action.payload?.message || "Failed to fetch comments";
}) 
    }
})


export  const {reset, clearMessage} = postSlice.actions

export default postSlice.reducer;