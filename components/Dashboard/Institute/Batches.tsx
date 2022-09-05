import React, { useEffect, useState } from 'react'
import { getInstituteBatchesWithTeacher } from 'helpers/APIs/institute'
import { BatchModel } from 'helpers/types'

const Batches = () => {
  const [batches, setBatches] = useState<BatchModel[]>([])

  useEffect(() => {
    getInstituteBatchesWithTeacher().then((data) => setBatches(data))
  }, [])

  console.log(batches)

  return (
    <div className="mt-5 w-full">
      <h1 className="mb-3 text-2xl">Batches</h1>
    </div>
  )
}

export default Batches
