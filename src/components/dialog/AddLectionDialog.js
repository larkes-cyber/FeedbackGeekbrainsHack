import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';


const AddLectionDialog = (
    props
) => {
    const [open, setOpen] = React.useState(true);
    const [age, setAge] = React.useState('');
    const [courses, setCourses] = React.useState(null);
    const [title, setTitle] = React.useState("");
    const [descr, setDescr] = React.useState("");
    const [tutor, setTutor] = React.useState("");

    React.useEffect(() => {
        const list = []
        props.courses.forEach(item => {
            list.push(<MenuItem value={item.id}>{item.title}</MenuItem>)
        });
        setCourses(list);
    }, props);


  const handleChange = (event) => {
    setAge(event.target.value);
  };

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
            console.log(email);
            props.callbackDone({
              idCourse:age,
              title:title,
              description:descr,
              tutor:tutor
            });
          },
        }}
      >
        <DialogTitle sx={{width:"80vh"}} >Добавить новую лекцию</DialogTitle>
        <DialogContent>
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" color='secondary'>Выберете курс</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            color='secondary'
            required
            onChange={handleChange}
            >
            {courses}
            </Select>
        </FormControl>
        </Box>  
          <TextField
            autoFocus
            required
            color='secondary'
            margin="dense"
            id="name"
            name="email"
            label="Введите название лекции"
            fullWidth
            onChange={(e) => {
              setTitle(e.target.value);
            }}  
            variant="standard"
          />
          <TextField
            autoFocus
            required
            color='secondary'
            margin="dense"
            id="name"
            name="email"
            label="Введите преподавателя лекции"
            fullWidth
            onChange={(e) => {
              setTutor(e.target.value);
            }}  
            variant="standard"
          />
           <TextField
            autoFocus
            required
            color='secondary'
            margin="dense"
            id="name"
            name="email"
            onChange={(e) => {
              setDescr(e.target.value);
            }}  
            label="Введите описание лекции"
            fullWidth
            multiline
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            props.callbackClose();}}
            color='secondary'
            >Отметить</Button>
          <Button 
          type="submit"
          color='secondary'
          >Добавить</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AddLectionDialog;