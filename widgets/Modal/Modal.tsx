import React from 'react'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'

import Loading from 'widgets/Loading/Loading'
import { ModalProps } from 'helpers/types'

const Modal: React.FC<ModalProps> = ({
  open,
  closeDialog,
  heading,
  children,
  buttonTxt,
  onSubmit,
  actionInProgress,
  headerStyles,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => closeDialog(false)}
      // fullWidth
    >
      <div className="flex flex-col items-center rounded-xl bg-primary-dark px-8 py-5">
        {heading && (
          <h1 className={`text-2xl font-thin sm:text-3xl ${headerStyles}`}>
            {heading}
          </h1>
        )}
        <IconButton
          className="absolute top-0 right-0 text-white"
          onClick={() => closeDialog(false)}
        >
          <CloseIcon />
        </IconButton>
        {children}
      </div>

      {/* <Divider classes={{ root: classes.bottomDivider }} /> */}
      {buttonTxt && (
        <DialogActions>
          {actionInProgress ? (
            <Loading size={25} />
          ) : (
            <Button onClick={onSubmit} color="secondary" variant="contained">
              {buttonTxt}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  )
}

export default Modal
