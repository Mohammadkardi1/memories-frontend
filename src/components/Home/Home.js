import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PostForm from '../PostForm/PostForm';
import { fetchAllPosts } from '../../redux/actions/PostActions';
import Posts from '../Posts/Posts'
import Paginate from '../Pagination/Pagination';
import { useLocation } from 'react-router-dom';
import { getPostsBySearch } from '../../redux/actions/PostActions';
import { SearchForm } from '../SearchForm/SearchForm';
import { AuthActions } from '../../redux/slices/AuthSlice';



const Home = () => {
  const [currentId, setCurrentId] = useState(0)
  const dispatch = useDispatch()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const page = searchParams.get('page') || 1

  useEffect(() => {
    if (searchParams.get('searchQuery')) {
      dispatch(getPostsBySearch(searchParams.get('searchQuery')))
    } else {
      dispatch(fetchAllPosts(page))
      if (JSON.parse(localStorage.getItem('profile')) !== null) {
        dispatch(AuthActions.loginByToken())
      }
    }
    
  }, [dispatch, page])


  return (
    <>
    <div className='grid grid-cols-4 gap-6'>
      <div className='col-span-4'>
        <p className='text-center text-[1.4rem] md:text-[2rem] mb-4'>
          Add your happy memories and share with us
        </p>
      </div>
      <div className='col-span-4 flex flex-col sm:flex-row justify-between items-center'> 
        <PostForm currentId={currentId} setCurrentId={setCurrentId} />
        <SearchForm/>
      </div>
      <div className='col-span-4'>
        <Posts />
      </div>
      <div className='col-span-4'>
        { page && 
          <Paginate page={page}/>
        }
      </div>

    </div>
    </>
  );
};

export default Home;