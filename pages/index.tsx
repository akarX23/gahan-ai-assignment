import { Button } from '@mui/material'
import useAuth from 'helpers/hooks/useAuth'
import { LoginParams } from 'helpers/types'
import Wrapper from 'hoc/Wrapper'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from 'redux/hooks'

const Home: React.FC = () => {
  const auth = useAppSelector((state) => state.auth)
  const { signIn, signOutFromApp } = useAuth()
  const [values, setValues] = useState<LoginParams>({
    email: '',
    password: '',
  })

  useEffect(() => {
    console.log(auth)
  }, [auth])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signIn(values)
  }

  return (
    <div className="padding-alignment mt-8">
      {auth.isAuthenticated ? (
        <>
          <p>{auth.details.name}</p>
          <Button onClick={() => signOutFromApp()}>Sign Out</Button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleChange}
            value={values.email}
            name="email"
            placeholder="email"
          />
          <input
            type="password"
            onChange={handleChange}
            value={values.password}
            name="password"
            placeholder="password"
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  )
}

export default Wrapper(Home)
