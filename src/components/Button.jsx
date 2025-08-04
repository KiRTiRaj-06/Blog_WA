import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-cyan-400',
    textColor= 'white',
    className='',
    ...props
}) {
  return (
    <button className={`py-4 px-4 m-auto ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
    </button>
  )
}

export default Button