import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'

const Loading: React.FC<{
  fullPage?: boolean
  className?: string
  size?: number
  containerStyles?: string
}> = ({ fullPage, className, size, containerStyles }) => {
  return (
    <div
      className={`${
        fullPage && 'fixed inset-0 flex items-center justify-center bg-paper'
      } ${containerStyles}`}
      style={{ zIndex: 100 }}
    >
      <CircularProgress
        size={size}
        className={className ? className : 'text-primary-main'}
      />
    </div>
  )
}

export default Loading
