import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../../..";

export const register = createAsyncThunk(
    'auth/register',
    async(user,thunkAPI)=>{
        try{

            const response = await clientServer.post('/api/auth/register',{
                 name : user.name,
                 email : user.email,
                 password : user.password,
            });
            console.log(response.data);
            return response.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response?.data || {message : err.message})
        }
    });


export const login = createAsyncThunk(
    'auth/login',
    async(user,thunkAPI)=>{
        try{
        const response = await clientServer.post('/api/auth/login',{
            email : user.email,
            password : user.password
        });
        if(response.data.token){
            localStorage.setItem('token', response.data.token);
            return response.data
        }else{
            return thunkAPI.rejectWithValue({message : "Token not provided!"})
        }

    }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message})
    }
});

export const uploadProfilePicture = createAsyncThunk(
    'auth/updateProfilePicture',
    async({token,profilePicture} ,thunkAPI)=>{
        const formData = new FormData();
        formData.append('profilePicture',profilePicture);
        try{
        const response = await clientServer.post('api/auth/profile-picture',formData,{
            headers : {
                'Content-Type' : 'multipart/form-data',
                Authorization : `Bearer ${token}`
            }
        });
        return thunkAPI.fulfillWithValue(response.data);
    }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message})
    }
    
});


export const getUserAndPosts = createAsyncThunk(
 'auth/getUserAndItsPosts',
 async(token,thunkAPI)=>{
    try{
        const response = await clientServer.get('api/auth/me',{
           headers : {
            Authorization : `Bearer ${token}`
           }  
        });

      console.log('PROFILE API:', response.data)

        return thunkAPI.fulfillWithValue(response.data);
 }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message})
    }
    
});