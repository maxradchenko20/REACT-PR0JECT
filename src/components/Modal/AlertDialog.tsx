import * as React from 'react';
import {useState, useRef} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";



export const AlertDialog = () => {
  const [openModal, setOpenModal] = useState(false);

  let btnRef = useRef<HTMLButtonElement>(null);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false)
  };

  const handleCloseDelete = () => {
    setOpenModal(false)

  };

  return (
    <div>
      <DeleteOutlineIcon onClick={handleClickOpen} style={{color: 'red'}}/>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Really delete?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Now you will remove the user forever.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button ref={btnRef} onClick={handleCloseDelete}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
