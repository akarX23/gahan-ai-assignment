import { studentQuizzes } from 'helpers/APIs/student'
import { QuizModel } from 'helpers/types'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from 'redux/hooks'

const Batches = () => {
  const [quizzes, setQuizzes] = useState<QuizModel[]>([])
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  useEffect(() => {
    studentQuizzes().then(setQuizzes)
  }, [isAuthenticated])

  return (
    <div className="mt-5 w-full max-w-3xl">
      <h1 className="mb-3 text-2xl">Upcoming Quizzes</h1>
      <div className="hide-scroll-x flex w-full overflow-x-scroll">
        {quizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="mr-4 flex-shrink-0  rounded-lg bg-primary-main px-3 py-2 text-fg"
          >
            <h3 className="m-0 mb-2">{quiz.title}</h3>
            <p className="m-0 mb-2">Teacher: {quiz.teacher.name}</p>
            <p className="m-0 mb-2">Duration {quiz.duration} hours</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Batches
