import React  from 'react'
import { Pagination, PaginationItem  } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.post.posts)

  return (
    <div className='flex justify-center bg-white text-white p-4 rounded-md shadow-xl '>
      <Pagination
        count={numberOfPages}
        page={Number(page) || 1}
        color="secondary"
        style={{color: 'white'}}
        renderItem={(item) => (
          <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
        )}
        />
    </div>
  );
};

export default Paginate