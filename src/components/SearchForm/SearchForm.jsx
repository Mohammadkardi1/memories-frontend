import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getPostsBySearch } from '../../redux/actions/PostActions'

export const SearchForm = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (search.trim()) {
      dispatch(getPostsBySearch(search));
      navigate(`/posts/search?searchQuery=${search || 'none'}`)
    } else {
      navigate('/')
    }
    }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e)
    }
    }

  return (
    <div className='flex flex-col gap-4 bg-white p-4 rounded-md shadow-xl'>
      <form autoComplete="off"  className='space-y-4 ' onSubmit={handleSubmit}>
        <input 
          type='text' 
          name='search' 
          placeholder='Search Memories'
          className='input-text'
          required
          value={search}
          onKeyDown={handleKeyPress}
          onChange={(e) => setSearch(e.target.value)}/>
        <button 
          type='submit' 
          className='w-full bg-blue-600 py-3 rounded-md text-white font-bold' 
          >
          Search
        </button>
      </form>
    </div>
  )
}
