import './App.css';
import './Styles.css'
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import AuthForm from './components/AuthForm/AuthForm'
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './components/PostDetails/PostDetails';
import { useSelector } from 'react-redux';
import { LoadingModel } from './components/Models/LoadingModel';

function App() {
  const {isLoggedin} = useSelector((state) => state.auth);


  return ( 
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <BrowserRouter>
        <div className='mx-auto py-6 px-5 sm:px-8 md:px-10'>
          <Navbar/>
          <Routes>
            <Route path="/*" element={<Navigate to="/posts" replace />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            {/* Prevent users to access authentication page once they logged in */}
            <Route path='/auth' element={!isLoggedin ?  <AuthForm/> :  <Navigate to="/posts"/>}/>
          </Routes>
        </div>
        <LoadingModel/>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
