import React, { useEffect, useState } from 'react'
import { getInstituteBatchesWithTeacher } from 'helpers/APIs/institute'
import { BatchModel } from 'helpers/types'
import { Button } from '@mui/material'
import BatchModal from './BatchModal'

const Batches = () => {
  const [batches, setBatches] = useState<BatchModel[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [currBatchEdit, setCurrBatchEdit] = useState<BatchModel>()

  useEffect(() => {
    getInstituteBatchesWithTeacher().then((data) => setBatches(data))
  }, [])

  return (
    <div className="mt-5 w-full max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="mb-3 text-2xl">Batches</h1>
        <Button
          className="font-bold"
          onClick={() => {
            setCurrBatchEdit({})
            setOpenModal(true)
          }}
        >
          Create Batch
        </Button>
      </div>
      <div className="hide-scroll-x flex w-full overflow-x-scroll">
        {batches.map((batch) => (
          <div
            className="mr-4 flex-shrink-0  rounded-lg bg-primary-main px-3 py-2 text-fg"
            key={batch._id}
          >
            <h3 className="m-0 mb-2">{batch.title}</h3>
            <p className="m-0 mb-2">Teacher: {batch.teacher.name}</p>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                setCurrBatchEdit(batch)
                setOpenModal(true)
              }}
            >
              Edit
            </Button>
          </div>
        ))}
      </div>
      <BatchModal
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        batch={currBatchEdit}
        finishEdit={(batch) => {
          setBatches((prev) => {
            const index = prev.findIndex((b) => b._id === batch._id)
            if (index === -1) {
              return [...prev, batch]
            } else {
              prev[index] = batch
              return prev
            }
          })
          setOpenModal(false)
        }}
      />
    </div>
  )
}

export default Batches
