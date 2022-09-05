import Institute from 'components/Dashboard/Institute'
import { userTypes } from 'helpers/types'
import Wrapper from 'hoc/Wrapper'
import React from 'react'
import { useAppSelector } from 'redux/hooks'
import Loading from 'widgets/Loading/Loading'

const Home: React.FC = () => {
  const { isLoading, details } = useAppSelector((state) => state.auth)

  if (isLoading) return <Loading />

  return (
    <div className="padding-alignment mt-8">
      {details.type === userTypes.institute && <Institute />}
    </div>
  )
}

export default Wrapper(Home)
