import React, { useEffect } from 'react'
import { Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchPost, fetchAllPosts } from '../../redux/actions/PostActions'
import moment from 'moment'
import Post from '../post/Post'



const PostDetails = () => {
  const { posts, post } = useSelector((state) => state.post)
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchPost(id))
    if (posts.length === 0 ) {
      dispatch(fetchAllPosts(1))

    }
  }, [id])

  if (!post) return null

  const openPost = (_id) => navigate(`/posts/${_id}`)

  const recommendedPosts = posts.data?.filter(({ _id }) => _id !== post._id)


  return (
    <div className='bg-white p-6 rounded-md shadow-xl space-y-20' >
      <div className=' '>
        <div className='section space-y-8'>
          <p className='text-[3rem] font-bold'>{post.title}</p> 
          <p className='text-gray-500 text-[1.4rem]' >{post.tags?.map((tag) => `#${tag} `)}</p>
          <p className='text-[1.6rem]'>{post.message}</p>
          <div>
            <p className='text-[1.2rem]'>Created by: {post.creator}</p>
            <p className='text-[1.2rem]'>{moment(post.createdAt).fromNow()}</p>
          </div>
          <Divider style={{ margin: '30px 0', borderWidth: '2px' }} />
        </div>
        <div className='section'>
          <img 
            className='card-media w-full min-h-[600px] rounded-[20px] object-cover' 
            src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} 
            alt={post.title} />
        </div>
      </div>
      {recommendedPosts?.length && (
        <div className='section'>
          <p className='text-[2rem] font-bold mb-6'>
            You might also like:
          </p>
          <Divider />
          <div className='grid grid-cols-6 gap-4'>
            {recommendedPosts.map((post, index) => (
              index < 6 ? (<Post key={post._id} post={post} onClick={() => openPost(post._id)}/>) : null
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails