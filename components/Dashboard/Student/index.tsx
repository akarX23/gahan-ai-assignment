import { userTypes } from 'helpers/types'
import React, { useEffect } from 'react'
import { useAppSelector } from 'redux/hooks'
import Quizzes from './Quizzes'

const Institute = () => {
  const { details, isLoading } = useAppSelector((state) => state.auth)

  if (!isLoading && details.type === userTypes.student && !details.studentBatch)
    return (
      <h1>
        To continue, your instute must accept your application! Please contact
        your institute and try again!
      </h1>
    )

  return (
    <div>
      <Quizzes />
    </div>
  )
}

export default Institute
