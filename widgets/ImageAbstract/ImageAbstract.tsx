import React from 'react'
import Image from 'next/image'
import { ImageAbstractProps } from 'helpers/types'

const ImageAbstract = (props: ImageAbstractProps) => {
  return (
    <div
      className={`relative ${props.noBgColor ? '' : 'bg-fg-dark'} ${
        props.containerClass
      }  ${!props.src && 'opacity-30'}`}
      onClick={props.onClick}
    >
      {props.src && (
        <Image
          src={props.src}
          objectFit={props.objectFit}
          layout="fill"
          alt={props.alt}
        />
      )}
      {props.overl && (
        <div className="relative h-full bg-blue-800 opacity-25 transition delay-100 duration-300 hover:opacity-0"></div>
      )}
    </div>
  )
}

export default ImageAbstract
