import './tutorPage.scss';
import CustomTabPanel from '../../components/tabs/Tabs';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as React from 'react';
import ChartView from './views/ChartView';
import Divider from '@mui/material/Divider';
import CommentsList from '../../components/list/CommentsList'
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import LectionsList from '../../components/list/LectionsList';
import QuestionView from './views/QuestionView';
import LectionRepository from '../../features/lections/LectionsRepository';
import MainView from './views/main_view/MainView';



const TutorPage = () => {

    const lectionRepository = new LectionRepository();


    const [tabs, setTabs] = useState(0);
    const [courses, setCourses] = useState(null)
    const [selectedLection, setLection] = useState(null);
    const [selectedLectionMain, setSelectedLectionMain] = useState(null);
    const [questions, setQuestions] = useState(null);

    useEffect(() => {
        lectionRepository.fetchAllLectionsCourses().then((res) => {
            setCourses(res);
        });
    }
    ,[]);

    useEffect(() => {
        lectionRepository.fetchLectionMain(selectedLection).then(res => {
            setSelectedLectionMain(res);
        })
    }, [selectedLection]);

  
    const handleChange = (event, newValue) => {
      setTabs(newValue);
    };
  
    console.log(selectedLection + " ffdgdfgfdg")

    return(
        <section className='tutor_page'>
            <div className='container'>
                <div className='tutor_page__wrapper'>
                    <div className='tutor_page__lections'>
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
                            sx={{mt:"20px", mb:"15px", width:"95%", ml:"2%"}}
                            onChange={(e) => {
                                console.log(e.target.value)
                            }}      
                        />
                        {
                            courses != null ? <LectionsList 
                            items={courses}
                             lectionCallback={(id) => {
                                setLection(id);
                            }}
                             selectedLection={selectedLection}
                              /> : null
                        }
                    </div>
                    <div className='tutor_page__tabs'>
                        <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs
                                value={tabs} 
                                onChange={handleChange} 
                                aria-label="basic tabs example"
                                textColor="secondary"
                                indicatorColor="secondary"
                                >
                                <Tab label="Основное" />
                                <Tab label="Статистика"  />
                                <Tab label="Вопросы"  />
                                </Tabs>
                                </Box>
                                <CustomTabPanel value={tabs} index={0}>
                                    {selectedLectionMain != null ? <MainView lection={selectedLectionMain} /> : null}
                                </CustomTabPanel>
                                <CustomTabPanel value={tabs} index={1}>
                                    <div className='tutor_page__tabs__chart'>
                                    <ChartView/>
                                    <ChartView/>
                                    <ChartView/>
                                    <ChartView/>
                                    <ChartView/>
                                    <ChartView/>

                                    </div>
                                </CustomTabPanel>
                                <CustomTabPanel value={tabs} index={2}>
                                  <QuestionView questions={questions} />
                                </CustomTabPanel>
                        </Box>
                    </div>
                </div>
            </div>
        </section>
    ) 
}

export default TutorPage;