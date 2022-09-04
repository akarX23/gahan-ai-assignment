import React from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { TextFieldProps } from '@mui/material'

const InputField = (props: UseControllerProps & TextFieldProps) => {
  const { field, fieldState } = useController(props)

  return (
    <div className="flex flex-col">
      <TextField
        {...field}
        label={props.label}
        placeholder={props.placeholder}
        variant={props.variant || 'filled'}
        className={`${props.className}`}
        InputProps={{
          classes: {
            root: `text-fg-dark bg-fg`,
            disabled: 'text-fg-dark bg-gray-300',
            error: 'text-red-500 bg-red-100',
          },
        }}
        type={props.type}
        {...props}
      />
      {fieldState.error && (
        <p className="text-xs text-red-400">{fieldState.error.message}</p>
      )}
    </div>
  )
}

export default InputField
