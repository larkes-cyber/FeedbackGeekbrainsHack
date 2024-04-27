import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import React, { useEffect, useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Card } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField';




const QuestionView = (props) => {

    const [questions, setQuestions] = useState(null);

    useEffect(() => {
        const newArr = [];
        props.questions.forEach(element => {
            newArr.push(<Card
                elevation={2}
                sx={{mb:1, ml:1, mr:5, mt:1, width:"95%", p:1, pl:2, display: 'inline-flex'}}
                >
                <ListItemText
                    primary = {
                     element.question
                    }
                />
                <BorderColorIcon sx={{mr:1, mt:0.5}}/>
                <ClearIcon sx={{mr:1, mt:0.5}}/>
            </Card>);
        });
        setQuestions(newArr);
    }, []);

    return(
        <List sx={{bgcolor: 'background.paper', width:'100%', maxHeight:"100vh", padding:0 }}> 
            {questions}
            <NewQuestionForm/>
            <Button
                component="label"
                sx={{width:"100%", height:"40px", mt:"40px"}}
                role={undefined}
                variant="contained"
                color='secondary'
                tabIndex={-1}
                endIcon={<AddIcon/>}
                >
                  Добавить новый вопрос
            </Button>
        </List>
    )


}


const NewQuestionForm = (props) => {
   return( 
        <Card
            elevation={2}
            sx={{mb:1, ml:1, mr:5, mt:1, width:"96%", pb:1, pl:2, display: 'inline-flex', alignItems:"center", justifyContent:"space-between"}}
            >
      <TextField 
      id="standard-basic"
       label="Введите ваш вопрос" 
       sx={{width:"90%"}} 
       variant="standard" 
       color='secondary'
       />
            <DoneIcon sx={{mr:2, mt:0.5}}/>
        </Card>
    )
}

export default QuestionView;