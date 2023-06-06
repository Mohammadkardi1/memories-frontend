import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import DeleteIcon from '@mui/icons-material/Delete'
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost } from '../../redux/actions/PostActions';
import './post.css'
import { useNavigate } from 'react-router-dom';


const Post = ({post, isModelOpen, setIsModelOpen, setMessage}) => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const {isLoggedin} = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const MAX_LENGTH = 40
  const MAX_TAG_LENGTH = 5;

  const Likes = () => {
      return post.likes.find((like) => like === (user?._id))
        ? (
          <><ThumbUpIcon fontSize="small" />&nbsp;{`${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpOffAltOutlinedIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        )
  }

  const likeHandler = (id) => {
    if (isLoggedin) {
      dispatch(likePost(id))
    } else {
      setMessage('Please Login')
      setIsModelOpen(!isModelOpen)
    }
  }

  const deleteHandler = (creatorId, postId) => {
    if (creatorId === JSON.parse(localStorage.getItem('profile'))?._id) {
      dispatch(deletePost(postId))
    } else {
      if (isLoggedin) {
        setMessage('This is not your own post, so you do not have the permission to delete it.')
      } else {
        setMessage('Please Login')
      }
      setIsModelOpen(!isModelOpen)
    }
  }

  return (
    <>
    <Card className='card' raised elevation={6} >
      <div onClick={() => navigate(`/posts/${post._id}`)} style={{'cursor': 'pointer'}}>
        <CardMedia 
            className='media' 
            image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} 
            title={post.title} />
        <div className='details flex flex-col'>
          <Typography variant="h6" className='text-md'>{post.creator}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div className='details'>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.slice(0, MAX_TAG_LENGTH).map((tag) => `#${tag} `)}
            {post.tags.length > MAX_TAG_LENGTH ? '...' : null }
          </Typography>
        </div>
        <Typography className='title' gutterBottom variant="h5" component="h2">
              {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {
              post.message.split(' ').slice(0, MAX_LENGTH).join(' ') + '...'
            }
            <button className='text-blue-600'>
              Read more
            </button>
          </Typography>
        </CardContent>
      </div>
      <CardActions className='cardActions'>        
        <button 
          className={`text-blue-600 `}
          // disabled={} 
          onClick={() =>likeHandler(post._id)}>
          <Likes />
        </button>
        <button 
          className={`text-red-600 `}
          onClick={() => deleteHandler(post.creatorId, post._id)}>
              <DeleteIcon fontSize="small" /> Delete
        </button>
      </CardActions>
    </Card>
    </>
  );
};

export default Post;