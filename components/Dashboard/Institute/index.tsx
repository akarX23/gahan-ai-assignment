import React from 'react'
import Batches from './Batches'
import Teachers from './Teachers'
import Verification from './PendingVerification'
import QuizResults from '../QuizResults/QuizResults'

const Institute = () => {
  return (
    <div>
      <Batches />
      <Teachers />
      <Verification />
      <QuizResults />
    </div>
  )
}

export default Institute
