import './studentPage.scss';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import LectionsList from '../../components/list/LectionsList';
import LectionRepository from '../../features/lections/LectionsRepository';
import MessageIcon from '@mui/icons-material/Message';
import DoneIcon from '@mui/icons-material/Done';
import { IconButton } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import { Card } from '@mui/material';
import FilteredLectionsList from '../../components/list/FilteredLectionsList';
import { Link,NavLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';





const StudentPage = () => {
    
    const [courses, setCourses] = useState(null);
    const [selectedLection, setLection] = useState(null);
    const [chatMessages, setChatMessages] = useState(null);
    const [dinamicQuestions, setDinamicQuestions] = useState([]);
    const [questions, setQuestions] = useState(null);
    const [textField, setTextField] = useState("");
    const [showChat, setShowingChat] = useState(false);
    const [dynamicQuestions, setDynamicQuestions] = useState(null);
    const [filtedLections, setFiltedLections] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [answers, setAnswers] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    

    const lectionRepository = new LectionRepository();

    const refreshLections = () => {
        lectionRepository.fetchAllLectionsCourses().then((res) => {
            setCourses(res);
        });
    }

    useEffect(() => {
        lectionRepository.fetchFiltredLections(filterText).then(res => {
            res.json().then(lects => {
                setFiltedLections(lects.lection);
            })
        })
    },[filterText]);

    useEffect(() => {
        refreshLections();
    }
    ,[]);

    useEffect(() => {
        if(selectedLection != null){
            lectionRepository.fetchQuestions(selectedLection).then(res => {
                setQuestions(res);
                setDynamicQuestions(res);
            })
        }
    }, [selectedLection]);

    useEffect(() => {
        if(questions != null){
            setChatMessages([<Message isClient={false} message={questions[0].question} key={questions[0].question} />])
            setChatHistory([{
                isClient:false,
                message:questions[0].question,
                idQuestion:questions[0].id }]);
            const dymQ = dynamicQuestions;
            dymQ.shift();
            setDinamicQuestions(dymQ);
        }
    }, [questions]);

    const addAnswer = (answ, question) => {
        const tmp = answers
        tmp.push({
            idQestion:question.id,
            answer:answ
        });
        setAnswers(tmp);
    }

    const addBotMessage = () => {
        if(dynamicQuestions.length != 0){
            console.log(dynamicQuestions[0]);
            addNewMessage(false, dynamicQuestions[0].question, dynamicQuestions[0].id );
            const dymQ = dynamicQuestions;
            dymQ.shift();
            setDinamicQuestions(dymQ);
        }else{
            if(chatHistory.length != 0){
                const output = []
                console.log(chatHistory)
                for(let i = 0; i < chatHistory.length-1; i+=2){
                    output.push({
                        idQestion:chatHistory[i].idQuestion,
                        answer:chatHistory[i+1].message,
                        idLection:selectedLection
                    });
                }

                lectionRepository.addAnswer(output).then(()=>{
                    setChatHistory([]);
                })
            }
            addNewMessage(false, "Спасибо, мы успешно собрали ваш отзыв!");
        }
    }

    const addNewMessage = (isClient, message, idQuestion) => {
        const tmp = chatMessages;
        tmp.push(<Message isClient={isClient} message={message} key={message} />)
        setChatMessages(tmp);
        const hst = chatHistory;
        hst.push({
            isClient:isClient,
            message:message,
            idQuestion:idQuestion
        });
        setChatHistory(hst);
    }

    return(
        <section className='student_page'>
            <NavLink style={{width:"50%"}} to="/">
                <Button
                variant="outlined"
                color="secondary"
                sx={{mb:"3%"}}
                startIcon={<ArrowBackIcon/>}
                
                    >
                    Вернуться назад
                </Button>
            </NavLink>
            <div className='container'>
                <div className='student_page__wrapper'>
                    <div className='student_page__lections'>
                        <Typography
                                    sx={{ display: 'inline', mt:"40px", ml:"1%"}}
                                    component="span"
                                    variant="h4"
                                    color="text.primary"
                                >
                            Курсы/Лекции
                        </Typography>
                        <TextField
                            id="outlined-size-small"
                            placeholder='Поиск...'
                            size="small"
                            color='secondary'
                            sx={{mt:"20px", mb:"15px", width:"95%", ml:"2%"}}
                            onChange={(e) => {
                                setFilterText(e.target.value);
                            }}      
                        />
                          {
                            courses != null && filterText.length == 0  ? <LectionsList 
                            items={courses}
                             lectionCallback={(id) => {
                                setLection(id);
                            }}
                             selectedLection={selectedLection}
                              /> : null
                        }
                        {
                            filterText.length != 0  ? <FilteredLectionsList 
                            items={filtedLections}
                             lectionCallback={(id) => {
                                setLection(id);
                            }}
                             selectedLection={selectedLection}
                              /> : null
                        }
                    </div>
                    <div className='student_page__chat'>
                        <div style={{height:"75%", display:"flex", flexDirection:"column", marginBottom:"3%"}} className='student_page__chat__view'>
                            {chatMessages}
                        </div>

                        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                            <TextField
                                hiddenLabel
                                id="filled-hidden-label-normal"
                                color='secondary'
                                value={textField}
                                onChange={(e) => {
                                    setTextField(e.target.value);
                                }} 
                                variant="filled"
                                sx={{width:"94%"}}
                            />
                            <IconButton  sx={{width:"4%"}} onClick={() => {
                                   addNewMessage(true, textField);   
                                   setTextField("");
                                   addBotMessage();
                            }}>
                                <DoneIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
            
    )
   
}

const Message = (props) => {
    return(
        <div 
        style={
            {
                width:"100%",
                display:"flex",
                flexDirection:"row",
                justifyContent:props.isClient ? "end" : "start"
             }
            }>

            <Card
                elevation={2}
                sx={{mb:1, ml:1, mr:5, mt:1, p:1, minWidth:"30%" }}
                key={props.message}
                >
                <ListItemText
                    primary = {
                        props.isClient ? "Вы" : "Бот"
                    }
                    secondary = {
                        props.message
                    }
                />
            </Card>

        </div>
    )
}

export default StudentPage;