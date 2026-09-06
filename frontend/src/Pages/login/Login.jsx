import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import './Login.css'
import { login } from '../../config/redux/action/authAction';
import { clearMessage } from '../../config/redux/reducer/authReducer';
export const Login = () => {
  const {isError, isLoading, user,message} = useSelector((state)=>state.auth);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
      email : '',
      password : ''
  });
 
   function handleInputChange(e){
    const {name, value} = e.target;
     setUserDetails((prev)=>({
        ...prev , [name] :  value
     }))

  }
   
 async function handleLogin(e){
    e.preventDefault();
    const result = await dispatch(login(userDetails));
    if(login.fulfilled.match(result)){
        setUserDetails({
            email : '',
            password : ''
        });
     await dispatch(clearMessage());
     nav('/');
    }
      
  }
  return (
    <div className = 'cardContainer'>
                <div className='registerCard'>
                  
                    <div style={{marginTop : '12px'}}>
                        <h4>LOGIN </h4>
                        <div>
                       
                        <p className='para'>Don't have an Account? 
                            <span onClick={()=>nav('/signup')} style={{color:"#e75480" , cursor : "pointer"}}>  Signup here</span>
                        </p>
                        
                        
                    </div>
                            <form onSubmit={handleLogin}>
                    <div className ='inputRow'>
                      
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
                        <button type='submit' className='loginBtn' disabled={isLoading}>
                            {isLoading ? "Logging in..": "Login"} 
                        </button>
                    </div>
                    </div>
                    </form>
                    
                </div>
            </div>  
            </div>
  )
}
