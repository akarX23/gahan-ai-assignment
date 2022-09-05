import { Button } from '@mui/material'
import { sendEmailOtp, verifyOTP } from 'helpers/APIs/user'
import Wrapper from 'hoc/Wrapper'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { showAlert } from 'redux/alert'
import { setUserForApp } from 'redux/auth'
import { useAppDispatch, useAppSelector } from 'redux/hooks'

const VerifyEmail = () => {
  const { isEmailAuthenticated, isAuthenticated, details, isLoading } =
    useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')

  useEffect(() => {
    if (isAuthenticated && isEmailAuthenticated) {
      router.replace('/')
    }
  }, [isAuthenticated, isEmailAuthenticated])

  const sendOtp = async () => {
    await sendEmailOtp()
    dispatch(showAlert({ severity: 'success', text: 'OTP sent to your email' }))
    setOtpSent(true)
  }

  const verifyOtp = async () => {
    try {
      await verifyOTP(otp)
      dispatch(showAlert({ severity: 'success', text: 'Email verified' }))

      dispatch(setUserForApp())
    } catch (err) {
      dispatch(showAlert({ severity: 'error', text: 'Invalid Otp' }))
    }
  }

  if (isLoading) return <></>

  return (
    <div className="margin-alignment mt-8">
      <h1>
        We need to verify your email before you can continue! Please click the
        below button to receive an OTP on your registered mail Id.
      </h1>
      {!otpSent ? (
        <Button color="primary" variant="contained" onClick={sendOtp}>
          Send OTP
        </Button>
      ) : (
        <>
          <h3>OTP sent to {details.email}</h3>
          <div className="flex">
            <input
              type="text"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              className="mr-3 p-2"
            />
            <Button color="primary" variant="contained" onClick={verifyOtp}>
              Verify OTP
            </Button>
          </div>
          <p>Not received yet?</p>
          <Button color="primary" variant="contained" onClick={sendOtp}>
            Resend OTP
          </Button>
        </>
      )}
    </div>
  )
}

export default Wrapper(VerifyEmail)
