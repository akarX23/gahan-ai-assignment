import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

import React from 'react'
import { makeStyles } from 'tss-react/mui'
import { grey } from '@mui/material/colors'
import { Theme } from '@mui/material'

const useStyles = makeStyles()((theme: Theme) => ({
  menuContain: {
    padding: '10px',
    backgroundColor: `${theme.palette.common.white} !important`,
    color: theme.palette.common.black + ' !important',
    fontSize: 16,
    boxShadow: '0 0 1px #000',
    [theme.breakpoints.down('sm')]: {
      padding: '7px',
    },
  },
  menu: {
    backgroundColor: theme.palette.common.white,
    paddingLeft: '2px',
    paddingRight: '2px',
    boxShadow: theme.shadows[4],
    marginTop: 5,
    maxHeight: 400,
    maxWidth: 600,
    zIndex: 30,
  },
  menuItem: {
    color: theme.palette.common.black,
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: 'red',
      overflowX: 'auto',
    },
    padding: '5px 25px 5px 7px',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
      padding: '3px 20px 3px 3px',
    },
  },
  selectedItem: {
    backgroundColor: `${theme.palette.primary.light} !important`,
    color: 'white',
  },
  field: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'black',
    },
    maxWidth: 400,
  },
}))

export type DropdownProps = {
  value?: string | number
  items?: any[]
  onChange?: (value: string) => void
  fieldStyles?: string
  type?: string
  menuContainStyles?: string
  menuPaperStyles?: string
  menuItemStyles?: string
  selectedItemStyles?: string
}

const Dropdown = ({
  value,
  items,
  onChange,
  fieldStyles,
  menuPaperStyles,
  menuItemStyles,
  selectedItemStyles,
}: DropdownProps) => {
  const { classes } = useStyles()
  return (
    <TextField
      select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      classes={{ root: `${classes.field} ${fieldStyles}` }}
      variant="outlined"
      SelectProps={{
        classes: {
          select: classes.menuContain,
        },
        MenuProps: {
          classes: {
            paper: `${classes.menu} ${menuPaperStyles}`,
          },
          disableScrollLock: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        },
      }}
    >
      {items.map((item, i) => (
        <MenuItem
          value={item.value}
          key={i}
          classes={{
            root: `${classes.menuItem} ${menuItemStyles} hide-scroll-X`,
            selected: `${classes.selectedItem} ${selectedItemStyles}`,
          }}
        >
          {item.text ? item.text : item}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default Dropdown
