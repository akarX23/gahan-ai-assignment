import React from 'react'
import { UseControllerProps, Controller } from 'react-hook-form'
import Dropdown, { DropdownProps } from './Dropdown'

const DropdownControl = (props: UseControllerProps & DropdownProps) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { onChange, value } }) => (
        <Dropdown
          value={value}
          items={props.items}
          onChange={onChange}
          menuItemStyles="hover:bg-gray-200"
          selectedItemStyles="hover:bg-primary-main"
        />
      )}
    />
  )
}

export default DropdownControl
