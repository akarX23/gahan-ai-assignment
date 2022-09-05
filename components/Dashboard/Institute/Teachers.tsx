import React, { useEffect, useState } from 'react'
import { getAllTeachers } from 'helpers/APIs/institute'
import { userInDb } from 'helpers/types'
import { Button } from '@mui/material'
import TeacherModal from './TeachersModal'

const Teachers = () => {
  const [teachers, setTeachers] = useState<userInDb[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [cuuTeacherEdit, setCurrTeacherEdit] = useState<userInDb>()

  useEffect(() => {
    getAllTeachers().then((data) => setTeachers(data))
  }, [])

  return (
    <div className="mt-5 w-full max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="mb-3 text-2xl">Teachers</h1>
        <Button
          className="font-bold"
          onClick={() => {
            setCurrTeacherEdit({})
            setOpenModal(true)
          }}
          variant="contained"
        >
          Create Teacher
        </Button>
      </div>
      <div className="hide-scroll-x flex w-full overflow-x-scroll">
        {teachers.map((teacher) => (
          <div
            key={teacher._id}
            className="mr-4 flex-shrink-0  rounded-lg bg-primary-main px-3 py-2 text-fg"
          >
            <h3 className="m-0 mb-2">{teacher.name}</h3>
            <p className="m-0 mb-2">Email: {teacher.email}</p>
            <p className="m-0 mb-2">Contact no: {teacher.phone}</p>
          </div>
        ))}
      </div>
      <TeacherModal
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        finishEdit={(teacher) => {
          setTeachers([...teachers, teacher])
          setOpenModal(false)
        }}
      />
    </div>
  )
}

export default Teachers
