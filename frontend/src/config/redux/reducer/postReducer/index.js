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
    nextCursor: null, 
    hasMore: true,

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
            const { posts, nextCursor, hasMore, isFirstPage } = action.payload;
            state.posts = isFirstPage ? posts : [...state.posts, ...posts];
            state.nextCursor = nextCursor;
            state.hasMore = hasMore;
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

    const { comment, post_id } = action.payload;

    const index = state.posts.findIndex(
        post => post._id === post_id
    );

    if (index !== -1 && comment) {
        state.posts[index].comments.push(comment);
    }

    state.comments.push(comment);

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
    state.isError = false;
    state.isSuccess = true;
    state.isLoading = false;
    const updatedPost = action.payload?.post;

    if (updatedPost) {
        const index = state.posts.findIndex(
            post => post?._id === updatedPost?._id
        );

        if (index !== -1) {
            state.posts[index] = updatedPost;
        }
    }

    state.message = action.payload?.message || "Post liked";
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
    state.isError = false;
    state.isSuccess = true;
    state.isLoading = false;

    const updatedPost = action.payload?.post;

    if (updatedPost) {
        const index = state.posts.findIndex(
            post => post?._id === updatedPost?._id
        );

        if (index !== -1) {
            state.posts[index] = updatedPost;
        }
    }

    state.message = action.payload?.message || "Post unliked";
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