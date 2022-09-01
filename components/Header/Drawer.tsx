import React, { ReactEventHandler } from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'

import { navBarLinks } from 'helpers/constants'

const Drawer = ({
  open,
  toggleDrawer,
}: {
  open: boolean
  toggleDrawer: ReactEventHandler
}) => {
  function DrawerList() {
    return (
      <div className="h-full w-full min-w-60 max-w-sm bg-paper">
        <List>
          {navBarLinks.map(({ link, text, Icon }, index) => (
            <Link href={link} passHref key={index}>
              <ListItem
                button
                component={'a'}
                className="hover:bg-primary-dark"
              >
                <ListItemIcon className="text-fg">
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={text} className="text-fg" />
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    )
  }

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={toggleDrawer}
      onOpen={toggleDrawer}
    >
      <DrawerList />
    </SwipeableDrawer>
  )
}

export default Drawer
