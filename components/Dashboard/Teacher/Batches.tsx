import React, { useEffect, useState } from 'react'
import { BatchModel } from 'helpers/types'
import { getBatchesForTeacher } from 'helpers/APIs/teacher'

const Batches = () => {
  const [batches, setBatches] = useState<BatchModel[]>([])

  useEffect(() => {
    getBatchesForTeacher().then((data) => setBatches(data))
  }, [])

  return (
    <div className="mt-5 w-full max-w-3xl">
      <h1 className="mb-3 text-2xl">Assigned Batches</h1>

      <div className="hide-scroll-x flex w-full overflow-x-scroll">
        {batches.map((batch) => (
          <div
            className="mr-4 flex-shrink-0  rounded-lg bg-primary-main px-3 py-2 text-fg"
            key={batch._id}
          >
            <h3 className="m-0 mb-2">{batch.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Batches
