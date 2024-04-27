import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import React, { useEffect, useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Card } from '@mui/material';


const QuestionView = (props) => {

    const [questions, setQuestions] = useState(null);

    useEffect(() => {
        const newArr = [];
        props.questions.forEach(element => {
            newArr.push(<Card
                elevation={2}
                sx={{mb:1, ml:1, mr:5, mt:1, width:"95%", p:1, pl:2 }}
                >
                <ListItemText
                    primary = {
                     element.name
                    }
                />
            </Card>);
        });
        setQuestions(newArr);
    }, []);

    return(
        <List sx={{bgcolor: 'background.paper', width:'100%', maxHeight:"100vh", padding:0 }}> 
            {questions}
        </List>
    )


}

export default QuestionView;