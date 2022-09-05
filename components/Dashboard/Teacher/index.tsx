import React from 'react'
import QuizResults from '../QuizResults/QuizResults'
import Batches from './Batches'
import Quizzes from './Quizzes'

const Teacher = () => {
  return (
    <div>
      <Batches />
      <Quizzes />
      <QuizResults />
    </div>
  )
}

export default Teacher
