import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../../..";


export const getAllPosts = createAsyncThunk(
    "post/getAllPosts",
    async ({cursor}={}, thunkAPI)=>{
        try{
            const params = cursor ? {cursor, limit : 5} : {limit : 5}
            const response = await clientServer.get('/api/posts',{params});
             return thunkAPI.fulfillWithValue({ ...response.data, isFirstPage: !cursor });

        }catch(err){
            return thunkAPI.rejectWithValue(err.response?.data || { message: err.message })
        }
    });

export const createPost = createAsyncThunk(
    'post/createPost',
    async({token,payload},thunkAPI)=>{
         try{
            const response = await clientServer.post('/api/posts',payload,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type' : 'multipart/form-data',
                }
            })
            if(response.status === 201){
            return thunkAPI.fulfillWithValue("Post uploaded!");
            }else{  
            return thunkAPI.fulfillWithValue("Post not uploaded!");
            }
        }catch(err){
            return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
            
        }
    });
export const getCommentsByPost = createAsyncThunk(
  'post/getCommentsByPost',
  async (post_id, thunkAPI) => {
    try {
      const response = await clientServer.get(`/api/posts/${post_id}/comments`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: err.message }
      );
    }
  }
);
export const addComment = createAsyncThunk(
    'post/addComments',
    async({token,post_id, comment},thunkAPI)=>{
        try{
         const response = await clientServer.post(`/api/posts/${post_id}/comments`,{text : comment},{
             headers : {
                    Authorization : `Bearer ${token}`
               }
            });
              return thunkAPI.fulfillWithValue({ ...response.data, post_id });
        }catch(err){
            return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
        }
    });

export const incrementPostLikes = createAsyncThunk(
    'post/incrementLikes',
    async({token,post_id},thunkAPI)=>{
        try{
         const response = await clientServer.post(`/api/posts/${post_id}/likes`,{},{
             headers : {
                    Authorization : `Bearer ${token}`
               }
            });
             return thunkAPI.fulfillWithValue(response.data);
        }catch(err){
            return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
        }
    });

export const decrementPostLikes = createAsyncThunk(
    'post/decrementLikes',
    async({token,post_id},thunkAPI)=>{
        try{
         const response = await clientServer.delete(`/api/posts/${post_id}/unlikes`,{
             headers : {
                    Authorization : `Bearer ${token}`
               }
            });
             return thunkAPI.fulfillWithValue(response.data);
        }catch(err){
            return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
        }
    });