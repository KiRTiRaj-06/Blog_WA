import React from 'react'

function Logo({width='100px'}) {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" className='w-10 h-10 bg-gray-700 rounded-full' 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke=" purple" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round">
              <polyline  points="5  13 9 17 19 7 " />
      </svg>
    </>
  )
}

export default Logo