import { Button } from '@mui/material'
import { QuizQuestionModel } from 'helpers/types'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from 'widgets/InputField/InputField'

type Props = {
  onFinish: (id: string, data: QuizQuestionModel) => void
  serialNumber: number
}

const QuizQuestion = (props: Props) => {
  const { control, handleSubmit, getValues, reset } =
    useForm<QuizQuestionModel>({
      defaultValues: {
        question: '',
        options: [],
        correctOption: 0,
        marks: 0,
      },
    })

  const [optionTexts, setOptionTexts] = useState<string[]>([])

  return (
    <div className="w-full max-w-2xl">
      <h2>Question {props.serialNumber + 1}</h2>
      <form>
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
          <p className="flex">
            <p>{i + 1}: </p>
            <input
              type="text"
              value={option}
              onChange={(event) =>
                setOptionTexts(
                  optionTexts.map((_, j) =>
                    i === j ? event.target.value : option
                  )
                )
              }
              className="ml-2 w-auto p-1 text-lg"
            />
          </p>
        ))}
      </form>
    </div>
  )
}

export default QuizQuestion
