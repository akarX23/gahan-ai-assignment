import { Button } from '@mui/material'
import {
  getStudentsForVerification,
  verifyStudent,
} from 'helpers/APIs/institute'
import { StudentVerification } from 'helpers/types'
import React, { useEffect, useState } from 'react'
import { showAlert } from 'redux/alert'
import { useAppDispatch } from 'redux/hooks'

const PendingVerification = () => {
  const [verifications, setVerifications] = useState<StudentVerification[]>([])

  useEffect(() => {
    getStudentsForVerification().then(setVerifications)
  }, [])

  const dispatch = useAppDispatch()

  const verify = async (studVerifyId: string, accept?: boolean) => {
    try {
      await verifyStudent(studVerifyId, accept)
      dispatch(showAlert({ text: 'Verified Student', severity: 'success' }))

      setVerifications((prev) => prev.filter((v) => v._id !== studVerifyId))
    } catch (err) {
      console.log(err)
      dispatch(showAlert({}, true))
    }
  }

  return (
    <div className="mt-5 w-full max-w-3xl">
      <h1 className="mb-3 text-2xl">Pending Verifications</h1>
      <div className="hide-scroll-x flex w-full overflow-x-scroll">
        {verifications.map((verification) => (
          <div
            key={verification._id}
            className="mr-4 flex-shrink-0  rounded-lg bg-primary-main px-3 py-2 text-fg"
          >
            <h3 className="m-0 mb-2">{verification.student.name}</h3>
            <p className="m-0 mb-2">Batch: {verification.batch.title}</p>
            <div className="flex">
              <Button
                className="mx-2"
                color="secondary"
                variant="contained"
                onClick={() => verify(verification._id, true)}
              >
                Accept
              </Button>
              <Button
                className="mx-2"
                color="error"
                variant="contained"
                onClick={() => verify(verification._id)}
              >
                Deny
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PendingVerification
