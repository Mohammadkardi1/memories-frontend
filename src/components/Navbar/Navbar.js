import React, { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom'
import memoriesText from '../../images/memoriesText.png';
import memoriesLogo from '../../images/memoriesLogo.png'
import { useDispatch } from 'react-redux';
import { AuthActions } from '../../redux/slices/AuthSlice';
import decode from 'jwt-decode';



const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch()
  const location = useLocation()

  const logout = () => {
    dispatch(AuthActions.logout())
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout()
      }
    }
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])


  return (
    <div className='mb-10 flex justify-between py-4 px-4 bg-white text-white text-lg
          font-bold rounded-xl shadow-xl '>
      <div>
        <Link to='/'>
          <div className='flex items-center space-x-2'>
            <img src={memoriesLogo} alt="icon" style={{"height": "40px"}}/>
            <img src={memoriesText} alt="icon" style={{"height": "45px"}} 
                className='hidden md:block'/>
          </div>
        </Link>
      </div>
      <div>
        { user ?  (
          <div className='flex items-center space-x-4 text-xl'>
            {user?.picture  ?  
              <img 
                src={user?.picture}
                alt={user?.name} 
                style={{"height": "45px"}}
                className='rounded-full hidden md:block'
            />
            :
              <img 
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS9-73UZFtwlGMya7r7RPUm8N4na0r_TFLj0JUoh8j9W-2OYo&s'
                alt={user?.name}
                style={{"height": "45px"}}
                className='rounded-full hidden md:block'
              />
            }
            <p className='text-black hidden md:block'>
              {user?.name.split(" ")[0]}
            </p>
            <button 
              className='bg-red-600 py-2 px-4 rounded-md' 
              onClick={logout}>
                Logout
            </button>
          </div>
        ) :
        (
          <Link to='/auth'>
            <button 
              className='bg-blue-600 py-2 px-4 rounded-md' >
              Sign In
            </button>
          </Link>
        )
      }
      </div>
    </div>
  );
};

export default Navbar