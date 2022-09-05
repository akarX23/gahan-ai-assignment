import { Button } from '@mui/material'
import QuizQuestion from 'components/QuizQuestion/QuizQuestion'
import { addQuiz, getBatchesForTeacher } from 'helpers/APIs/teacher'
import { BatchModel, QuizModel, QuizQuestionModel } from 'helpers/types'
import Wrapper from 'hoc/Wrapper'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { showAlert } from 'redux/alert'
import { useAppDispatch } from 'redux/hooks'
import DropdownControl from 'widgets/Dropdown/DropdownControl'
import InputField from 'widgets/InputField/InputField'

const CreateQuiz = () => {
  const { handleSubmit, control, reset, setValue, getValues } =
    useForm<QuizModel>({
      defaultValues: {
        title: '',
        questions: [],
        duration: 0,
        batch: '',
        _id: '',
      },
    })
  const dispatch = useAppDispatch()
  const [questions, setQuestions] = useState<QuizQuestionModel[]>([])
  const [questionCount, setQuestionCount] = useState(0)
  const [batches, setBatches] = useState<{ text: string; value: string }[]>([])

  const onSubmit = async (data: QuizModel) => {
    let newQuiz = await addQuiz(data)
    dispatch(
      showAlert({
        text: 'Successfully saved Quiz!',
        severity: 'success',
      })
    )

    reset(newQuiz)
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
        questions: [],
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
        <div className="flex">
          <Button
            variant="contained"
            className="my-2 mx-2"
            onClick={() => setQuestionCount(questionCount + 1)}
          >
            Add Question
          </Button>
          <Button variant="contained" className="my-2 mx-2" type="submit">
            Save Quiz
          </Button>
        </div>
      </form>
      {[...Array(questionCount)].map((_, i) => (
        <QuizQuestion
          serialNumber={i}
          onFinish={(id, data) => {
            setQuestions([...questions, data])
            setValue('questions', [...getValues('questions'), id])
          }}
          key={i}
        />
      ))}
    </div>
  )
}

export default Wrapper(CreateQuiz)
