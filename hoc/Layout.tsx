import React from 'react'

import Navbar from 'components/Header/Navbar'
import Footer from 'components/Footer/Footer'
import { DefaultComponentProps } from 'helpers/types'

const Layout: React.FC<DefaultComponentProps> = (props) => {
  return (
    <div className="flex h-screen flex-col justify-between">
      <Navbar />
      <div className="flex-1">{props.children}</div>
      {/* <Footer /> */}
    </div>
  )
}

export default Layout
