import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Person from '@mui/icons-material/Person'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import Link from 'next/link'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'

import useAuth from 'helpers/hooks/useAuth'
import { useAppSelector } from 'redux/hooks'
import { NavbarDropdown } from 'helpers/types'

const NavbarUserDropdown = () => {
  const { details, isLoading } = useAppSelector((state) => state.auth)
  const { signOutFromApp } = useAuth()

  const [anchorEl, setAnchorEl] = useState(null)

  if (!details || isLoading) return <></>

  const handleClick = (event: any) => {
    setAnchorEl(event.target)
  }

  const handleClose = (func: () => void) => {
    if (typeof func === 'function') func()
    setAnchorEl(null)
  }

  const renderLinkItem = (
    { link, text, Icon }: NavbarDropdown,
    key: number
  ) => (
    <Link href={link} key={key} passHref>
      <a>
        <MenuItem className="text-fg hover:bg-primary-dark">
          {Icon && (
            <ListItemIcon classes={{ root: 'min-w-0 mr-2' }}>
              <Icon className="m-0 text-fg" fontSize="small" />
            </ListItemIcon>
          )}
          <ListItemText primary={text} />
        </MenuItem>
      </a>
    </Link>
  )

  const renderFuncItem = (
    { func, text, Icon }: NavbarDropdown,
    key: number
  ) => (
    <MenuItem
      key={key}
      onClick={() => func()}
      className="text-fg hover:bg-primary-dark"
    >
      {Icon && (
        <ListItemIcon classes={{ root: 'min-w-0 mr-2' }}>
          <Icon className="m-0 text-fg" fontSize="small" />
        </ListItemIcon>
      )}
      <ListItemText primary={text} />
    </MenuItem>
  )

  let items: NavbarDropdown[] = [
    {
      text: 'My Profile',
      link: '/profile',
      Icon: Person,
    },
    {
      text: 'My Cart',
      link: '/cart',
      Icon: ShoppingCartIcon,
    },
    {
      text: 'Sign Out',
      func: signOutFromApp,
      Icon: ExitToAppIcon,
    },
    {
      text: 'Sell or Rent',
      link: '/product/add',
      Icon: MonetizationOnIcon,
    },
  ]

  return (
    <>
      <div
        className="ml-4 flex cursor-pointer items-center"
        aria-controls="dropdown"
        onClick={handleClick}
      >
        <Avatar
          alt="profile-pic"
          src={details.photoURL}
          className="h-6 w-6 sm:h-8 sm:w-8"
        />
        <ArrowDropDownIcon className="text-2xl" />
      </div>
      <Menu
        id="dropdown"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        className="mt-1 "
        classes={{
          paper: 'bg-paper',
        }}
      >
        {items.map((item, i) =>
          item.link ? renderLinkItem(item, i) : renderFuncItem(item, i)
        )}
      </Menu>
    </>
  )
}

export default NavbarUserDropdown
