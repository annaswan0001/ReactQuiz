import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({handleClose, open, countAnswer}) {
  



  const handleCloseDialog = () => {
    handleClose()
    countAnswer()
  };
  const handleCloseDialogSimple= () => {
    handleClose()

  };

  return (
    <div>
      <Button variant="outlined" color="primary" >
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Attention!!!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
               You have unfinished tests. Every unfinished test is considered as incorrect answer.
               Do you want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained"
                color="secondary" onClick={handleCloseDialogSimple} >
            Disagree
          </Button>
          <Button variant="contained"
                color="primary" onClick={handleCloseDialog}  autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}