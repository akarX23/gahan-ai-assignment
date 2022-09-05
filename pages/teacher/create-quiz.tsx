import { Button } from '@mui/material'
import QuizQuestion from 'components/QuizQuestion/QuizQuestion'
import { getBatchesForTeacher } from 'helpers/APIs/teacher'
import { BatchModel, QuizModel, QuizQuestionModel } from 'helpers/types'
import Wrapper from 'hoc/Wrapper'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import DropdownControl from 'widgets/Dropdown/DropdownControl'
import InputField from 'widgets/InputField/InputField'

const CreateQuiz = () => {
  const { handleSubmit, control, reset, getValues } = useForm<QuizModel>({
    defaultValues: {
      title: '',
      questions: [],
      duration: 0,
      batch: '',
    },
  })
  const [questions, setQuestions] = useState<QuizQuestionModel[]>([])
  const [questionCount, setQuestionCount] = useState(0)
  const [batches, setBatches] = useState<{ text: string; value: string }[]>([])

  const onSubmit = (data: QuizModel) => {
    console.log(data)
  }

  useEffect(() => {
    getBatchesForTeacher().then((data) => {
      setBatches(
        data.map((batch: BatchModel) => ({
          text: batch.title,
          value: batch._id,
        }))
      )

      reset({
        batch: data[0]._id,
      })
    })
  }, [])

  return (
    <div className="margin-alignment mt-5 ">
      <h1>Create Quiz</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap">
          <InputField
            name="title"
            control={control}
            label="Title"
            className="mr-4"
          />
          <DropdownControl control={control} name="batch" items={batches} />
          <InputField
            name="duration"
            control={control}
            label="Duration"
            className="ml-4"
            type={'number'}
          />
        </div>
        <Button
          variant="contained"
          className="my-2"
          onClick={() => setQuestionCount(questionCount + 1)}
        >
          Add Question
        </Button>
        {[...Array(questionCount)].map((_, i) => (
          <QuizQuestion
            serialNumber={i}
            onFinish={(id, data) => {
              setQuestions([...questions, data])
              reset({
                ...getValues(),
                questions: [...getValues('questions'), id],
              })
            }}
          />
        ))}
      </form>
    </div>
  )
}

export default Wrapper(CreateQuiz)
