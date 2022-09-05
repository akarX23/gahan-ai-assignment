import React, { useState } from 'react'
import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Button from '@mui/material/Button'
import Slide from '@mui/material/Slide'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Zoom from '@mui/material/Zoom'
import Fab from '@mui/material/Fab'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useTheme } from '@mui/styles'

// Images
import logo from 'assets/Images/logo.png'

// Custom imports
import Drawer from 'components/Header/Drawer'
import ImageAbstract from 'widgets/ImageAbstract/ImageAbstract'
import { DefaultComponentProps } from 'helpers/types'
import useAuth from 'helpers/hooks/useAuth'
import { useAppSelector } from 'redux/hooks'

function HideOnScroll(props: DefaultComponentProps) {
  const { children, window } = props

  const trigger = useScrollTrigger({ target: window ? window() : undefined })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

function ScrollTop(props: DefaultComponentProps) {
  const { children, window } = props

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = () => {
    const anchor = document.querySelector('#back-to-top-anchor')

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role="presentation"
        className="fixed bottom-6 right-6 z-50"
      >
        {children}
      </div>
    </Zoom>
  )
}

const Navbar: React.FC<DefaultComponentProps> = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth)
  const { signOutFromApp } = useAuth()

  const theme = useTheme()

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar className="padding-alignment min-h-16 bg-neutral py-1 text-fg">
          <Toolbar className="justify-between p-0">
            <div className="flex items-center">
              <IconButton
                edge="start"
                className="block p-1 md:hidden"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon className="text-2xl sm:text-3xl" />
              </IconButton>

              <Link href="/" passHref>
                <a>
                  <ImageAbstract
                    src={logo}
                    alt={'Brand-Logo'}
                    containerClass="sm:w-32 w-20 sm:h-12 h-8 ml-2 max-w-64 cursor-pointer"
                    objectFit="contain"
                    noBgColor
                  />
                </a>
              </Link>
            </div>

            {!isLoading ? (
              !isAuthenticated ? (
                <Link href="/login" passHref>
                  <Button
                    variant="contained"
                    color="primary"
                    className="ml-2 w-full max-w-max whitespace-nowrap text-sm mbmax:p-2 mb:text-lg"
                  >
                    Sign In
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  className="ml-2 w-full max-w-max whitespace-nowrap text-sm mbmax:p-2 mb:text-lg"
                  onClick={() => signOutFromApp()}
                >
                  Sign Out
                </Button>
              )
            ) : (
              <div></div>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" classes={{ root: 'bg-neutral' }} />
      <ScrollTop {...props}>
        <Fab color="primary" size="large" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      <Drawer
        open={drawerOpen}
        toggleDrawer={() => setDrawerOpen(!drawerOpen)}
      />
    </>
  )
}

export default Navbar
