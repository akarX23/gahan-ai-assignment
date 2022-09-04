import Wrapper from 'hoc/Wrapper'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAppSelector } from 'redux/hooks'
import { useForm } from 'react-hook-form'
import { LoginParams } from 'helpers/types'
import InputField from 'widgets/InputField/InputField'
import Button from '@mui/material/Button'
import useAuth from 'helpers/hooks/useAuth'
import Link from 'next/link'

const Login: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const router = useRouter()

  const { handleSubmit, control } = useForm<LoginParams>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const { signIn } = useAuth()

  useEffect(() => {
    if (isAuthenticated) router.replace('/')
  }, [isAuthenticated])

  const onSubmit = async (data: LoginParams) => {
    await signIn(data)
  }

  return (
    <div className="mx-auto mt-12 w-auto max-w-2xl rounded-lg bg-slate-700 py-4 px-6 ">
      <div className="flex items-center">
        <h1 className="mr-5 text-2xl font-bold">Login</h1>
        <Link href="/register">
          <p className="cursor-pointer text-[16px] text-blue-400 underline">
            Not yet registered? Register Here
          </p>
        </Link>
      </div>
      <form className="w-full max-w-4xl " onSubmit={handleSubmit(onSubmit)}>
        <InputField
          control={control}
          name="email"
          label="Email"
          placeholder="Email"
          type="email"
          rules={{ required: 'This field is required' }}
          className="mt-4"
        />
        <InputField
          control={control}
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
          rules={{ required: 'This field is required' }}
          className="mt-4"
        />
        <Button
          className="mt-6"
          color="primary"
          variant="contained"
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  )
}

export default Wrapper(Login)
