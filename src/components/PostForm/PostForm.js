import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../redux/actions/PostActions'
import { postActions } from '../../redux/slices/PostSlice';
import { MessageModel } from '../Models/MessageModel';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';


const PostForm = ({currentId, setCurrentId}) => {
  const {isLoggedin} = useSelector((state) => state.auth)
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [isFormModelOpen, setIsFormModelOpen] = useState(false)

  const [postData, setPostData] = useState({
    creator: '',
    title: '', 
    message: '',
    tags: '',
    selectedFile: ''
  })
  const dispatch = useDispatch()

  const clear = () => {
    setPostData({creator: '', title: '', message: '', tags: '', selectedFile: ''})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsFormModelOpen(!isFormModelOpen)
    clear()
    if (!isLoggedin) {
      setIsModelOpen(!isModelOpen)
    } else {
      dispatch(postActions.setLoading({loading: true}))
      const image = new FormData()
      image.append("file", postData.selectedFile)
      image.append("upload_preset", "memories")
      try {
        const uploadRes = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,image)
        const {url, public_id} = uploadRes.data
        const splitTags = postData.tags.trim().split(' ')
        const creatorId = JSON.parse(localStorage.getItem('profile'))._id
        const newPost = {...postData, tags: splitTags, creatorId, public_id, selectedFile: url}
        dispatch(createPost(newPost))
      } catch (err ) {
        dispatch(postActions.setLoading({loading: false}))
        console.log("Error when uploading the image", err)
      }
    }
  }

  return (
    <>
      <button className='h-fit bg-red-600 p-3 rounded-md text-white font-bold' 
        onClick={() => setIsFormModelOpen(!isFormModelOpen)}>
        Create a new memory
      </button>
    {
      isFormModelOpen && 
      <div className='fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-60'>
        <div className='bg-white p-4 rounded-md shadow-xl w-[500px]'>
          <div className='text-end mb-4'>
            <CloseIcon onClick={() => setIsFormModelOpen(!isFormModelOpen)} className='cursor-pointer text-end'/>
          </div>
          <form 
            autoComplete="off"  
            className='space-y-4 ' 
            onSubmit={handleSubmit}>
            <h1 className='text-xl'>
              Create a new memory
            </h1>
            <input name='creator' placeholder='Creator'  className='input-text' value={postData.creator}
              onChange={(e) => setPostData({ ...postData, creator: e.target.value })}required
              />
            <input name='title' placeholder='Title' className='input-text' value={postData.title}
              onChange={(e) => setPostData({ ...postData, title: e.target.value })}required
              />
            <textarea name='message' placeholder='Message' className='input-text'rows={4} 
              value={postData.message} required
              onChange={(e) => setPostData({ ...postData, message: e.target.value })}
              />
            <input name='tags' placeholder='Tags' className='input-text' value={postData.tags} 
              onChange={(e) => setPostData({ ...postData, tags: e.target.value })}required
              />
            <input type="file" accept="image/*" required
              onChange={(e) => setPostData({ ...postData, selectedFile: e.target.files[0] })}
              />
            <button type='submit' 
              className='w-full bg-blue-600 py-3 rounded-md font-bold text-white'>
              Post
            </button>
          </form>
          <button className='w-full mt-4 bg-pink-600 py-3 rounded-md font-bold text-white' 
            onClick={() => setIsFormModelOpen(!isFormModelOpen)}>
            Close
          </button>
          <MessageModel isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen} message={"Please Login"}/>
        </div>
      </div>
      }
    </>
  );
};

export default PostForm