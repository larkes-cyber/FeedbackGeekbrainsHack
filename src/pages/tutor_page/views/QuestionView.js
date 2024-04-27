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
import { IconButton } from '@mui/material';
import { fa } from 'faker/lib/locales';





const QuestionView = (props) => {

    const [questions, setQuestions] = useState(null);
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [formData, setFormData] = useState("");
    

    useEffect(() => {
        const newArr = [];
        props.questions.forEach(element => {
            newArr.push(<Card
                elevation={2}
                sx={{mb:1, ml:1, mr:5, mt:1, width:"95%", p:1, pl:2, display: 'flex', flexDirection:"row", verticalAlign:"center", alignItems:"center"}}
                >
                <ListItemText
                    primary = {
                     element.question
                    }
                />
                {/* <IconButton  
                sx={{mr:1}}
                >
                  <BorderColorIcon/>
                </IconButton> */}
                <IconButton
                  sx={{mr:1}}
                  onClick={()=>{
                        console.log(element);
                        props.onDeleteQuestion(element.id);
                    }}
                  >
                   <ClearIcon/>
                </IconButton>
            </Card>);
        });
        setQuestions(newArr);
    }, [props]);

    return(
        <List 
            sx={{bgcolor: 'background.paper', width:'100%', maxHeight:"100vh", padding:0 }}

        > 
            {questions}
            {showQuestionForm ? <NewQuestionForm 
            closeCallback={
                () => {
                    setShowQuestionForm(false);
                }}
            doneCallback={
                () => {
                    props.addQuestionCallback(formData);
                    setShowQuestionForm(false);
                }
            }
            onFormChange={
                (value)=>{
                    setFormData(value);
                }
            }
            /> : null}
            {
                localStorage.getItem("role") == "meth" || localStorage.getItem("role") == "org" ?
                <Button
                    component="label"
                    sx={{width:"100%", height:"40px", mt:"40px"}}
                    role={undefined}
                    variant="contained"
                    color='secondary'
                    tabIndex={-1}
                    endIcon={<AddIcon/>}
                    onClick={() => {
                        setShowQuestionForm(true);
                    }}
                    >
                    Добавить новый вопрос
                </Button>
                : null
            }
        </List>
    )


}


const NewQuestionForm = (props) => {
   return( 
        <Card
            elevation={2}
            sx={{mb:1, ml:1, mr:5, mt:1, width:"98%", display:"flex", flexDirection:"row"}}
            >
            <TextField 
                id="standard-basic"
                label="Введите ваш вопрос" 
                sx={{width:"90%", mb:1, ml:1, mt:1}} 
                variant="standard" 
                color='secondary'
                onChange={(e)=>{
                    props.onFormChange(e.target.value);
                }}
                />
            <IconButton onClick={() => {
                props.doneCallback();
            }}>
                <DoneIcon />
            </IconButton>
            <IconButton onClick={() => {
                props.closeCallback();
            }}>
               <ClearIcon />
            </IconButton>
        </Card>
    )
}

export default QuestionView;