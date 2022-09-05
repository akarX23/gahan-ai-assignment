import { Button } from '@mui/material'
import { createOrUpdateBatch, getAllTeachers } from 'helpers/APIs/institute'
import { BatchModel, userInDb } from 'helpers/types'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { showAlert } from 'redux/alert'
import { useAppDispatch } from 'redux/hooks'
import DropdownControl from 'widgets/Dropdown/DropdownControl'
import InputField from 'widgets/InputField/InputField'
import Modal from 'widgets/Modal/Modal'

type Props = {
  batch?: BatchModel
  isOpen: boolean
  closeModal: () => void
  finishEdit: (batch: BatchModel) => void
}

export default function BatchModal(props: Props) {
  const { control, handleSubmit, reset } = useForm<BatchModel>({
    defaultValues: {
      title: props.batch?.title || '',
      teacher: props.batch?.teacher?._id || 'Choose',
    },
  })
  const [teachersDropdown, setTeachersDropdown] = useState<
    { text: string; value: string }[]
  >([{ text: 'Choose', value: 'Choose' }])

  const dispatch = useAppDispatch()

  useEffect(() => {
    getAllTeachers().then((data) => {
      setTeachersDropdown([
        teachersDropdown[0],
        ...data.map((teacher) => ({
          text: teacher.name,
          value: teacher._id,
        })),
      ])
    })
  }, [])

  useEffect(() => {
    reset({
      title: props.batch?.title || '',
      teacher: props.batch?.teacher?._id || 'Choose',
    })
  }, [props.batch])

  const onSubmit = async (data: BatchModel) => {
    await createOrUpdateBatch({ ...data, _id: props.batch?._id })
    dispatch(
      showAlert({ text: 'Batch updated successfully', severity: 'success' })
    )

    let teacher = teachersDropdown.find((t) => t.value === data.teacher)
    props.finishEdit({
      title: data.title,
      teacher: {
        name: teacher?.text || '',
        _id: teacher.value,
      } as userInDb & string,
      _id: props.batch?._id || '',
    })
  }

  return (
    <Modal
      open={props.isOpen}
      closeDialog={props.closeModal}
      heading={props.batch ? 'Edit Batch' : 'Add Batch'}
    >
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type={'text'}
          name="title"
          label="Title"
          control={control}
          className="mb-3"
        />
        <DropdownControl
          name="teacher"
          control={control}
          items={teachersDropdown}
        />
        <Button
          color="secondary"
          type="submit"
          variant="contained"
          className="mt-3"
        >
          Save
        </Button>
      </form>
    </Modal>
  )
}
