import { getOwnedQuizzes, getQuizAnswers } from 'helpers/APIs/institute'
import { QuizAnswers, QuizModel } from 'helpers/types'
import React, { useEffect, useState } from 'react'
import Dropdown from 'widgets/Dropdown/Dropdown'

const QuizResults = () => {
  const [quizzes, setQuizzes] = useState<{ text: string; value: string }[]>([])
  const [selectedQuiz, setSelectedQuiz] = useState<string>('')

  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers[]>([])

  useEffect(() => {
    getOwnedQuizzes().then((quizzes) => {
      setQuizzes(quizzes.map((quiz) => ({ text: quiz.title, value: quiz._id })))
    })
  }, [])

  useEffect(() => {
    if (selectedQuiz) {
      getQuizAnswers(selectedQuiz).then(setQuizAnswers)
    }
  }, [selectedQuiz])

  return (
    <div>
      <h2>Quiz Results</h2>
      <div className="flex">
        <p className="mr-2">Select a quiz: </p>
        <Dropdown
          items={quizzes}
          value={selectedQuiz}
          onChange={(val) => setSelectedQuiz(val)}
        />
      </div>
      <div className="mt-4 flex">
        {quizAnswers.map((quizAnswer) => (
          <div
            key={quizAnswer._id}
            className="mx-2 rounded-lg bg-primary-main p-2"
          >
            <h3>{quizAnswer.student.name}</h3>
            <p>
              Score: {quizAnswer.totalMarks} out of {quizAnswer.maxMarks}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuizResults
