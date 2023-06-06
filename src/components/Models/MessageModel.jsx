import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

export const MessageModel = ({isModelOpen, setIsModelOpen, message}) => {


  return (
    <>
    {isModelOpen && 
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
        <div className='w-[500px] bg-white rounded-lg p-4 space-y-4'>
          <div className='text-end mb-4'>
            <CloseIcon onClick={() => setIsModelOpen(!isModelOpen)} className='cursor-pointer text-end'/>
          </div>
          <div className='flex items-center text-[1.5rem]'>
            {message}
          </div>
          <div className='text-end '>
            <button 
              className='bg-red-600 py-2 px-6 rounded-md text-white text-[1.3rem]'
              onClick={() => setIsModelOpen(!isModelOpen)}>
              Close
            </button>
          </div>
        </div>
      </div>
      }
    </>
  )
}
