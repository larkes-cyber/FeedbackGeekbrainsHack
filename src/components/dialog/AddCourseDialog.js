import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const AddCourseDialog = (
    props
) => {
    const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment   >
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            props.callbackDone();
            handleClose();
          },
        }}
      >
        <DialogTitle sx={{width:"80vh"}} >Добавить новый курс</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Введите название курса"
            fullWidth
            variant="standard"
            color='secondary'
          />
        </DialogContent>
        <DialogActions>
          <Button 
           color='secondary'
          onClick={() => {
            handleClose()
            props.callbackClose();
            }}>Отметить</Button>
          <Button 
           color='secondary'
          type="submit">Добавить</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AddCourseDialog;