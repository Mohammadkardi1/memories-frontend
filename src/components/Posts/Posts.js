import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MessageModel } from '../Models/MessageModel';
import Post from '../post/Post'

const Posts = () => {
  const {posts, loading} = useSelector((state) => state.post)
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [message, setMessage] = useState('')

  if (!posts.data?.length && !loading) {
    return (
      <div className='flex justify-center items-center text-xl'>
        <p>Unable to fetch posts at this time. Please try again later.</p>
      </div>
    )
  }
  
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {posts.data?.map((post) => (
            <Post 
              key={post._id} 
              post={post} 
              isModelOpen={isModelOpen} 
              setIsModelOpen={setIsModelOpen} 
              setMessage={setMessage}/>
        ))}
      </div>
      <MessageModel 
        isModelOpen={isModelOpen} 
        setIsModelOpen={setIsModelOpen} 
        message={message}/>
    </>
  )
};

export default Posts;