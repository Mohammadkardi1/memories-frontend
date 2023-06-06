import React from 'react'
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';



export const LoadingModel = () => {

    const postLoading  = useSelector((state) => state.post).loading

  return (
    <>
    {postLoading  && 
      <div className='fixed inset-0 flex items-center justify-center'>
            <CircularProgress size="7em" />
      </div>
      }
    </>
  )
}
