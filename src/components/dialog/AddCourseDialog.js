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




  return (
    <React.Fragment   >
      <Dialog
        open={true}
        onClose={() => {
            props.callbackClose();
        }}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            props.callbackDone(email);
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