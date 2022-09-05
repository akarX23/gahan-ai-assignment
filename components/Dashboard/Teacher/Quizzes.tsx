import { Button } from '@mui/material'
import { getQuizzes } from 'helpers/APIs/teacher'
import { QuizModel } from 'helpers/types'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from 'redux/hooks'

const Batches = () => {
  const [quizzes, setQuizzes] = useState<QuizModel[]>([])
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  useEffect(() => {
    getQuizzes().then(setQuizzes)
  }, [isAuthenticated])

  return (
    <div className="mt-5 w-full max-w-3xl">
      <div className="flex w-full items-center justify-between">
        <h1 className="mb-3 text-2xl">Quizzes Made</h1>
        <Link href="/teacher/create-quiz" passHref>
          <Button variant="contained">Create Quiz</Button>
        </Link>
      </div>
      <div className="hide-scroll-x flex w-full overflow-x-scroll">
        {quizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="mr-4 flex-shrink-0  rounded-lg bg-primary-main px-3 py-2 text-fg"
          >
            <h3 className="m-0 mb-2">{quiz.title}</h3>
            <p className="m-0 mb-2">Duration: {quiz.duration} hours</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Batches
