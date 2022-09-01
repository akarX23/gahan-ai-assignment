import { useEffect } from 'react'

import { setUserForApp } from 'redux/auth'
import { useAppDispatch } from 'redux/hooks'

const useGlobalAuth = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setUserForApp())
  }, [])
}

export default useGlobalAuth
