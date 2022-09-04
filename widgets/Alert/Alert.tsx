import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { hideAlert } from 'redux/alert'

const AlertUI = () => {
  const { open, text, severity, anchorOrigin } = useAppSelector(
    (state) => state.alert
  )
  const dispatch = useAppDispatch()

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={() => dispatch(hideAlert())}
      anchorOrigin={anchorOrigin}
    >
      <Alert severity={severity ? severity : 'success'} variant="filled">
        {text}
      </Alert>
    </Snackbar>
  )
}

export default AlertUI
