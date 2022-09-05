import { Button } from '@mui/material'
import { getAllQuizzes, getQuizData } from 'controllers/student'
import { attemptQuiz } from 'helpers/APIs/student'
import dbConnect from 'helpers/dbConnect'
import { QuestionAnswer, QuizModel } from 'helpers/types'
import Wrapper from 'hoc/Wrapper'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { showAlert } from 'redux/alert'
import { useAppDispatch } from 'redux/hooks'

type Props = {
  quiz?: QuizModel
  children?: React.ReactNode
}

const Quiz = (props: Props) => {
  const [answers, setAnswers] = useState<number[]>(
    props.quiz.questions.map((_) => -1)
  )
  const dispatch = useAppDispatch()
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let answersToSend: QuestionAnswer[] = answers.map((answer, index) => ({
      question: props.quiz.questions[index]._id,
      option: answer,
      marks: props.quiz.questions[index].marks,
    }))

    await attemptQuiz(props.quiz._id, answersToSend)

    dispatch(showAlert({ text: 'Answers saved!', severity: 'success' }))
    router.push('/')
  }

  return (
    <div className="margin-alignment">
      <h1>{props.quiz.title}</h1>
      <div className="flex items-center justify-between">
        <h3>Teacher: {props.quiz.teacher?.name}</h3>
        <h3>Batch: {props.quiz.batch?.title}</h3>
      </div>
      <h3>Duration: {props.quiz.duration} hours</h3>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <div className="flex items-center justify-between">
          <h1>Questions:</h1>
          <Button variant="contained" type="submit">
            Save Answers
          </Button>
        </div>
        {props.quiz.questions.map((question, i) => (
          <div className="w-full" key={question._id}>
            <h3 className="mb-0">{question.question}</h3>
            <p className="mt-1">Marks: {question.marks}</p>

            {question.options.map((option, j) => (
              <div key={option}>
                <input
                  checked={answers[i] === j}
                  value={j}
                  onChange={(event) =>
                    setAnswers(
                      answers.map((_, k) =>
                        k === i ? parseInt(event.target.value) : _
                      )
                    )
                  }
                  type="radio"
                  name={question._id}
                  id={option}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
            <hr />
          </div>
        ))}
      </form>
    </div>
  )
}

export const getStaticPaths = async () => {
  await dbConnect()

  const { data } = await getAllQuizzes()

  return {
    paths: data.map((quiz) => ({ params: { quizId: quiz._id.toString() } })),
    fallback: true,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  await dbConnect()

  const { quizId } = context.params

  const { data } = await getQuizData(quizId as string)
  return {
    props: {
      quiz: JSON.parse(JSON.stringify(data)),
    },
  }
}

export default Wrapper(Quiz)
