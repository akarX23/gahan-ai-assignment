import { Button } from '@mui/material'
import { addQuestion } from 'helpers/APIs/teacher'
import { QuizQuestionModel } from 'helpers/types'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from 'widgets/InputField/InputField'

type Props = {
  onFinish: (id: string, data: QuizQuestionModel) => void
  serialNumber: number
}

const QuizQuestion = (props: Props) => {
  const { control, handleSubmit, reset } = useForm<QuizQuestionModel>({
    defaultValues: {
      question: '',
      correctOption: 0,
      marks: 0,
      _id: '',
    },
  })

  const [optionTexts, setOptionTexts] = useState<string[]>([])

  const onSubmit = async (data: QuizQuestionModel) => {
    console.log(data)

    data.options = optionTexts

    let newQuestion = await addQuestion(data)
    reset(newQuestion)

    props.onFinish(newQuestion._id, newQuestion)
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center justify-between">
        <h2 className="mr-3">Question {props.serialNumber + 1}</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          control={control}
          name="question"
          label="Question"
          className="my-2"
        />
        <div className="mt-3 flex">
          <InputField
            control={control}
            name="correctOption"
            label="Correct Option"
            className="mx-2"
          />
          <InputField
            control={control}
            name="marks"
            label="Marks"
            className="mx-2"
          />
          <Button
            color="primary"
            variant="contained"
            onClick={() => setOptionTexts([...optionTexts, ''])}
          >
            Add Option
          </Button>
        </div>
        {optionTexts.map((option, i) => (
          <div className="my-4 flex" key={i}>
            <p>{i + 1}: </p>
            <input
              type="text"
              value={option}
              onChange={(event) =>
                setOptionTexts(
                  optionTexts.map((prevOption, j) =>
                    i === j ? event.target.value : prevOption
                  )
                )
              }
              className="ml-2 w-auto p-1 text-lg"
            />
          </div>
        ))}
        <div className="flex justify-end">
          <Button color="primary" variant="contained" type="submit">
            Save
          </Button>
        </div>
      </form>
      <hr />
    </div>
  )
}

export default QuizQuestion
