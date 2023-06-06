import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button } from '@mui/material';
import Input from './Input';
import jwt_decode from 'jwt-decode'
import { AuthActions } from '../../redux/slices/AuthSlice'; 
import LockIcon from '@mui/icons-material/Lock';
import Icon from './Icon';
import { loginUser, signupUser } from '../../redux/actions/AuthActions';
import { useSelector } from 'react-redux';
import { GoogleLogin  } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';



const initialState = { 
    name: '', 
    email: '', 
    password: '' };

const AuthForm = () => {
  const [form, setForm] = useState(initialState)
  const [isSignup, setIsSignup] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const switchMode = () => {
    setForm(initialState)
    setIsSignup((prevIsSignup) => !prevIsSignup)
    setShowPassword(false)
    console.log(form)
  }


  const googleSuccess = async (res) => {
    const {email, name, picture, sub } = jwt_decode(res.credential)
    try {
      dispatch(AuthActions.loginGoogle({email, name, picture, _id: sub, token: res.credential}))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  };

  const googleError = () => {
    alert('Google Sign In was unsuccessful. Try again later')
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()    
    const {email, password, name} = form
    if (isSignup) {
      try {
        const res = await dispatch(signupUser({email, password, name}))
        if (!res.error) {
          navigate('/')
        }
      } catch (error) {
        console.log('something went error')
      }
    } else {
      try { 
        const res = await dispatch(loginUser({email, password}))
        if (!res.error) {
          navigate('/')
        }
      } catch (error) {
        console.log('something went error')
      }
    }
  }

  return (
    <div className='flex justify-center'> 
      <div className='paper flex flex-col items-center w-[400px] bg-white p-4 rounded-md shadow-xl mt-[64px]'>
        <Avatar className='m-[4px]'>
          <LockIcon />
        </Avatar>
        <p className='text-[30px]'>
          { isSignup ? 'Sign up' : 'Log in' }
        </p>
        <form 
          className='w-full mt-8' 
          autoComplete="off" 
          onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            { isSignup && (
              <Input 
                name="name" 
                label="Username" 
                handleChange={handleChange} 
                autoFocus  
                />
            )}
            <Input 
                name="email" 
                label="Email Address" 
                handleChange={handleChange} 
                type="email" 
            />
            <Input 
                name="password" 
                label="Password" 
                handleChange={handleChange} 
                type={showPassword ? 'text' : 'password'} 
                handleShowPassword={handleShowPassword} 
            />
            <button 
              type='submit' 
              className='w-full bg-blue-600 py-3 rounded-md font-bold text-white'>
              { isSignup ? 'Sign Up' : 'Sign In' }
            </button>
            <div className='flex justify-center'>
              <GoogleLogin
                render={(renderProps) => ( 
                  <Button 
                    className='mb-4'
                    color="primary" 
                    fullWidth 
                    onClick={renderProps.onClick} 
                    disabled={renderProps.disabled} 
                    startIcon={<Icon />} 
                    variant="contained"
                    >
                    Google Sign In
                  </Button>
                )}
                onSuccess={googleSuccess}
                onError={googleError}
                // cookiePolicy="single_host_origin"
              />
            </div>
            <button onClick={switchMode} className='text-blue-600 text-start'>
              { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm