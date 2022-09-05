import { Button } from '@mui/material'
import { createTeacher } from 'helpers/APIs/institute'
import { userInDb, userTypes } from 'helpers/types'
import React from 'react'
import { useForm } from 'react-hook-form'
import { showAlert } from 'redux/alert'
import { useAppDispatch } from 'redux/hooks'
import InputField from 'widgets/InputField/InputField'
import Modal from 'widgets/Modal/Modal'

type Props = {
  isOpen: boolean
  closeModal: () => void
  finishEdit: (teacher: userInDb) => void
}

export default function TeacherModal(props: Props) {
  const { control, handleSubmit, reset } = useForm<userInDb>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  })

  const dispatch = useAppDispatch()

  const onSubmit = async (data: userInDb) => {
    let teacher = await createTeacher({ ...data, type: userTypes.teacher })
    dispatch(
      showAlert({ text: 'Batch updated successfully', severity: 'success' })
    )

    props.finishEdit(teacher)
  }

  return (
    <Modal
      open={props.isOpen}
      closeDialog={props.closeModal}
      heading={'Add Teacher'}
    >
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type={'text'}
          name="name"
          label="Name"
          control={control}
          className="mb-3"
        />
        <InputField
          type={'email'}
          name="email"
          label="Email"
          control={control}
          className="mb-3"
        />
        <InputField
          type={'text'}
          name="phone"
          label="Contact No."
          control={control}
          className="mb-3"
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
