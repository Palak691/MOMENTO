import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import './Signup.css'
import { register } from '../../config/redux/action/authAction';
import { clearMessage } from '../../config/redux/reducer/authReducer';
export const Signup = () => {
 const {isLoading, isError,message} = useSelector((state)=>state.auth); 
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    name : '',
    email : '',
    password : ''
  });
 function handleInputChange(e){
    const {name, value} = e.target;
     setUserDetails((prev)=>({
        ...prev , [name] :  value
     }));

  }
   

async function handleSignup(e){
  e.preventDefault()
    const result = await dispatch(register(userDetails));
    if(register.fulfilled.match(result)){
        setUserDetails({
            name : '',
            email : '',
            password : ''
        })
        await dispatch(clearMessage);
        nav('/login');
    } 

  }
  return (
  <div className = 'cardContainer'>
                <div className='registerCard'>
                    <div>
                         <div>
                        <p className='para'>Already have an Account? 
                            <span onClick={()=>nav('/login')} style={{color:"#e75480", cursor:"pointer"}}> Login here.</span>
                        </p>
                    </div>
                        <form onSubmit={handleSignup}>
                         
                    <div className ='inputRow'>
                        <div className='input'>
                            <label htmlFor="name">Name</label>
                            <input type="text" id='name' className='inputField' name="name" value={userDetails.name}
                                onChange={handleInputChange} placeholder='name' required />

                        </div>
                    </div>
                    <div className='input'>
                        <label htmlFor="email"> Email</label>
                        <input type="email" id='email' className='inputField' name="email" value={userDetails.email}
                            onChange={handleInputChange} placeholder='abc@gmail.com' required />
                    </div>
                    <div className='input'>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' name="password" value={userDetails.password}
                            className='inputField' onChange={handleInputChange} placeholder='***********' required />
                    </div>   
                      {message && (
                       <p className={isError ? "errorMessage" : "successMessage"}>
                       {message}
                       </p>
                       )}                    
                    <div>
                        <button className='signupBtn' type='submit' disabled={isLoading} >
                            {isLoading ? 'Signing up...' : "Signup"}
                        </button>

                    </div>
                    </form>
                    </div>
                   
                </div>
            </div>  
  )
}
