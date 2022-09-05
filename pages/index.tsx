import { Button } from '@mui/material'
import Institute from 'components/Dashboard/Institute'
import useAuth from 'helpers/hooks/useAuth'
import { LoginParams } from 'helpers/types'
import Wrapper from 'hoc/Wrapper'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from 'redux/hooks'

const Home: React.FC = () => {
  return (
    <div className="padding-alignment mt-8">
      <Institute />
    </div>
  )
}

export default Wrapper(Home)
