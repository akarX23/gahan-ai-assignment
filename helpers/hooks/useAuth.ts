import { loginUser, logoutUser } from 'helpers/APIs/user'
import { LoginParams } from 'helpers/types'
import { showAlert } from 'redux/alert'
import { setUserForApp } from 'redux/auth'
import { useAppDispatch } from 'redux/hooks'

const useAuth = () => {
  const dispatch = useAppDispatch()

  const signIn = async (user: LoginParams) => {
    try {
      await loginUser(user)
      await dispatch(setUserForApp())
      dispatch(
        showAlert({ severity: 'success', text: 'Logged in successfully!' })
      )
    } catch (err) {
      console.log(err)
      dispatch(showAlert({}, true))
    }
  }

  const signOutFromApp = async () => {
    await logoutUser()
    await dispatch(setUserForApp())
    dispatch(
      showAlert({ severity: 'success', text: 'Logged out successfully!' })
    )
  }

  return {
    signOutFromApp,
    signIn,
  }
}

export default useAuth
