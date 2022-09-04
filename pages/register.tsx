import Wrapper from 'hoc/Wrapper'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { useForm } from 'react-hook-form'
import { RegisterParams, userTypes } from 'helpers/types'
import InputField from 'widgets/InputField/InputField'
import Button from '@mui/material/Button'
import Dropdown from 'widgets/Dropdown/Dropdown'
import { getInstitutes } from 'helpers/APIs/institute'
import { showAlert } from 'redux/alert'
import DropdownControl from 'widgets/Dropdown/DropdownControl'
import { getBatchesByInstitute } from 'helpers/APIs/institute'
import { registerInstitute, registerStudent } from 'helpers/APIs/user'
import Link from 'next/link'

let userTypesDropdown = [
  {
    text: 'Institute',
    value: 'institute',
  },
  {
    text: 'Student',
    value: 'student',
  },
]

let fieldsData = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
  },
  {
    label: 'Contact No.',
    name: 'phone',
    type: 'text',
  },
  {
    label: 'Address',
    name: 'address',
    type: 'text',
  },
]

const Register: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [userType, setUserType] = useState(userTypesDropdown[0].value)
  const [instituteDropdown, setInstitutesDropdown] = useState<
    {
      text: string
      value: string
    }[]
  >([
    {
      text: 'Choose',
      value: 'Choose',
    },
  ])
  const [batchesDropdown, setBatchesDropdown] = useState<
    {
      text: string
      value: string
    }[]
  >([
    {
      text: 'Choose Institute First',
      value: 'Choose Institute First',
    },
  ])

  const { handleSubmit, control, register, getValues, setValue, watch, reset } =
    useForm<RegisterParams>({
      defaultValues: {
        email: '',
        name: '',
        address: '',
        phone: '',
        dob: '',
        batch: batchesDropdown[0].value,
        institute: instituteDropdown[0].value,
      },
    })

  useEffect(() => {
    if (isAuthenticated) router.replace('/')
  }, [isAuthenticated])

  useEffect(() => {
    if (userType === userTypes.student) {
      getInstitutes()
        .then((data) =>
          setInstitutesDropdown([
            instituteDropdown[0],
            ...data.map((institute) => ({
              text: institute.name,
              value: institute._id,
            })),
          ])
        )
        .catch((err) => {
          console.log(err)
          dispatch(showAlert({}, true))
        })
    }
  }, [userType])

  useEffect(() => {
    if (getValues('institute') === instituteDropdown[0].value) {
      setBatchesDropdown([
        {
          text: 'Choose Institute First',
          value: 'Choose Institute First',
        },
      ])
      setValue('batch', 'Choose Institute First')
      return
    }

    getBatchesByInstitute(getValues('institute'))
      .then((batches) => {
        setValue('batch', 'Choose')
        setBatchesDropdown([
          {
            text: 'Choose',
            value: 'Choose',
          },
          ...batches.map((batch) => ({
            text: batch.title,
            value: batch._id,
          })),
        ])
      })
      .catch((err) => console.log(err))
  }, [watch('institute')])

  const onSubmit = async (data: RegisterParams) => {
    try {
      if (userType === userTypes.institute) {
        delete data.dob
        delete data.institute
        delete data.batch

        await registerInstitute(data)

        dispatch(
          showAlert({
            text: 'Registered Successfully! Please check your email for credentials',
          })
        )
      } else {
        await registerStudent(data)
        dispatch(
          showAlert({
            text: 'Registered Successfully! Please check your email for credentials',
          })
        )
      }

      reset({
        email: '',
        name: '',
        address: '',
        phone: '',
        dob: '',
        batch: batchesDropdown[0].value,
        institute: instituteDropdown[0].value,
      })
    } catch (err) {
      console.log(err)
      dispatch(showAlert({}, true))
    }
  }

  return (
    <div className="mx-auto mt-12 w-auto max-w-2xl rounded-lg bg-slate-700 py-4 px-6 ">
      <div className="flex items-center">
        <h1 className="mr-5 text-2xl font-bold">Register</h1>
        <Link href="/login">
          <p className="cursor-pointer text-[16px] text-blue-400 underline">
            Already Registered? Login Here
          </p>
        </Link>
      </div>

      <div className="flex">
        <p className="mr-3 font-bold">User Type:</p>
        <Dropdown
          value={userType}
          items={userTypesDropdown}
          onChange={(value) => setUserType(value)}
          menuItemStyles="hover:bg-gray-200"
          selectedItemStyles="hover:bg-primary-main"
        />
      </div>
      <form className="w-full max-w-4xl " onSubmit={handleSubmit(onSubmit)}>
        {userType === userTypes.student && (
          <div className="flex w-full items-stretch justify-evenly">
            <div className="flex flex-col">
              <p className="mb-2 mr-3 font-bold">Date of Birth:</p>
              <input type="date" className="p-2" {...register('dob')} />
            </div>
            <div className="flex flex-col">
              <p className="mb-2 mr-3 font-bold">Institute:</p>
              <DropdownControl
                control={control}
                name="institute"
                items={instituteDropdown}
                rules={{ required: true }}
              />
            </div>
            <div className="flex flex-col">
              <p className="mb-2 mr-3 font-bold">Batch:</p>
              <DropdownControl
                control={control}
                name="batch"
                items={batchesDropdown}
                rules={{ required: true }}
              />
            </div>
          </div>
        )}
        {fieldsData.map((field) => (
          <InputField
            key={field.name}
            control={control}
            name={field.name}
            label={field.label}
            type={field.type}
            className="mt-4"
          />
        ))}
        <div className="w-full text-center">
          <Button
            className="mt-6 w-full max-w-40 text-lg"
            color="primary"
            variant="contained"
            type="submit"
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Wrapper(Register)
