import React from 'react'
import { useLocation } from 'react-router-dom';


const Header = () => {
  const { pathname } = useLocation();

  return (
    <div className='min-h-20 border-b-2 border-black/10 w-full py-3 px-4'>
      <small className='mb-3 block'>
          {pathname}
      </small>
      <strong className='text-2xl text-gray-800'>{pathname.slice(1).toUpperCase()}</strong>
    </div>
  )
}

export default Header