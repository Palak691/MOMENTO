import { createSlice } from "@reduxjs/toolkit"
import { getUserAndPosts, login, register, uploadProfilePicture } from "../../action/authAction"

const initialState = {
    user : null,
    token : null,
    userData : '',
    isError : false,
    isSuccess : false,
    isLoading  : false,
    message : '',
    isLoggedIn :false,
}

const authSlice = createSlice({
    name  : 'auth',
    initialState,
    reducers : {
        reset : ()=> initialState,
        clearMessage : (state)=>{
            state.message = ''
        }
    },
    extraReducers : (builder)=>{
     builder
     .addCase(register.pending,(state, action)=>{
        state.isLoading = true;
        state.message = "Loading..";
     })
     .addCase(register.fulfilled,(state,action)=>{
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = false;
        state.message = action.payload?.message;
     })
     .addCase(register.rejected,(state,action)=>{
         state.isError = true;
         state.isLoading = false;
         state.message = action.payload?.message || "Registration Failed";
     })

    .addCase(login.pending, (state) => { 
        state.isLoading = true;
         state.isError = false; 
         state.isSuccess = false; 
         state.message = "Logging in...";
    })
    .addCase(login.fulfilled, (state, action) => { 
        state.isLoading = false; 
        state.isError = false; 
        state.isSuccess = true; 
        state.isLoggedIn = true; 
        state.user = action.payload.user.name;
        state.token = action.payload.token;
        state.message = "Logged in Successfully"; 
    }) 
    .addCase(login.rejected, (state, action) => { 
        state.isLoading = false; state.isError = true;
        state.isSuccess = false; state.isLoggedIn = false; 
        state.message = action.payload?.message || "Login failed"; 
    })
     .addCase(uploadProfilePicture.pending, (state) => { 
         state.isLoading = true;
         state.isError = false; 
         state.message = "Uploading profile picture..."; 
    }) 
    .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.isLoading = false; 
        state.isError = false;
        state.isSuccess = true; 
        state.userData = action.payload;
        state.message = "Profile picture uploaded successfully";
    })
    .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.isLoading = false; 
        state.isError = true;
        state.isSuccess = false; 
        state.message = action.payload?.message || "Failed to upload profile picture"; 
    })
    .addCase(getUserAndPosts.pending, (state) => {
       state.isLoading = true; 
       state.isError = false; 
       state.message = "Loading user data..."; }) 
    .addCase(getUserAndPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.userData = action.payload; 
      state.message = ""; 
    }) 
    .addCase(getUserAndPosts.rejected, (state, action) => {
     state.isLoading = false;
     state.isError = true; 
     state.isSuccess = false;
     state.message = action.payload?.message || "Failed to fetch user data"; 
    });
    } 
})




export  const {reset, clearMessage} = authSlice.actions

export default authSlice.reducer;