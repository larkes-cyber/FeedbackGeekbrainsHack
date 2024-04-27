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



const TutorPage = () => {
    const [value, setValue] = useState(0);
    const [courses, setCourses] = useState(null)

    useEffect(() => {
        setCourses(
        [
            {
                course:{
                    id:"1234",
                    name:"Котлин про с нуля"
                },
                lections:[
                    {
                        name:"Основы программирования",
                        id:"343234",
                        description:"Прото́н — одна из трёх элементарных частиц, из которых построено обычное вещество. Протоны входят в состав атомных ядер; "
                    },
                    {
                        name:"Основы программирования",
                        id:"343234",
                        description:"Прото́н — одна из трёх элементарных частиц, из которых построено обычное вещество. Протоны входят в состав атомных ядер; "
                    },
                    {
                        name:"Основы программирования",
                        id:"343234",
                        description:"Прото́н — одна из трёх элементарных частиц, из которых построено обычное вещество. Протоны входят в состав атомных ядер; "
                    },
                    {
                        name:"Основы программирования",
                        id:"343234",
                        description:"Прото́н — одна из трёх элементарных частиц, из которых построено обычное вещество. Протоны входят в состав атомных ядер; "
                    }
                ]
            },
            {
                course:{
                    id:"1234",
                    name:"Котлин про с нуля"
                },
                lections:[
                    {
                        name:"Основы программирования",
                        id:"343234",
                        description:"Прото́н — одна из трёх элементарных частиц, из которых построено обычное вещество. Протоны входят в состав атомных ядер; "
                    },
                    {
                        name:"Основы программирования",
                        id:"343234",
                        description:"Прото́н — одна из трёх элементарных частиц, из которых построено обычное вещество. Протоны входят в состав атомных ядер; "
                    },
                    {
                        name:"Основы программирования",
                        id:"343234",
                        description:"Прото́н — одна из трёх элементарных частиц, из которых построено обычное вещество. Протоны входят в состав атомных ядер; "
                    },
                    {
                        name:"Основы программирования",
                        id:"343234",
                        description:"Прото́н — одна из трёх элементарных частиц, из которых построено обычное вещество. Протоны входят в состав атомных ядер; "
                    }
                ]
            },
            {
                course:{
                    id:"1234",
                    name:"Котлин про с нуля"
                },
                lections:[
                    {
                        name:"Основы программирования",
                        id:"343234",
                        description:"Прото́н — одна из трёх элементарных частиц, из которых построено обычное вещество. Протоны входят в состав атомных ядер; "
                    },
                    {
                        name:"Основы программирования",
                        id:"343234",
                        description:"Прото́н — одна из трёх элементарных частиц, из которых построено обычное вещество. Протоны входят в состав атомных ядер; "
                    },
                    {
                        name:"Основы программирования",
                        id:"343234",
                        description:"Прото́н — одна из трёх элементарных частиц, из которых построено обычное вещество. Протоны входят в состав атомных ядер; "
                    },
                    {
                        name:"Основы программирования",
                        id:"343234",
                        description:"Прото́н — одна из трёх элементарных частиц, из которых построено обычное вещество. Протоны входят в состав атомных ядер; "
                    }
                ]
            },
            {
                course:{
                    id:"1234",
                    name:"Котлин про с нуля"
                },
                lections:[
                    {
                        name:"Основы программирования",
                        id:"343234",
                        description:"Прото́н — одна из трёх элементарных частиц, из которых построено обычное вещество. Протоны входят в состав атомных ядер; "
                    },
                    {
                        name:"Основы программирования",
                        id:"343234",
                        description:"Прото́н — одна из трёх элементарных частиц, из которых построено обычное вещество. Протоны входят в состав атомных ядер; "
                    },
                    {
                        name:"Основы программирования",
                        id:"343234",
                        description:"Прото́н — одна из трёх элементарных частиц, из которых построено обычное вещество. Протоны входят в состав атомных ядер; "
                    },
                    {
                        name:"Основы программирования",
                        id:"343234",
                        description:"Прото́н — одна из трёх элементарных частиц, из которых построено обычное вещество. Протоны входят в состав атомных ядер; "
                    }
                ]
            },
        ]
        )
    }
    ,[]);

  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  

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
                            courses != null ? <LectionsList items={courses} lectionCallback={(id) => {
                                console.log(id);
                            }} /> : null

                        }
                    </div>
                    <div className='tutor_page__tabs'>
                        <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs
                                value={value} 
                                onChange={handleChange} 
                                aria-label="basic tabs example"
                                textColor="secondary"
                                indicatorColor="secondary"
                                >
                                <Tab label="Основное" />
                                <Tab label="Комментарии"  />
                                <Tab label="Графики"  />
                                </Tabs>
                                </Box>
                                <CustomTabPanel value={value} index={0}>
                                    <div className='big_block'>
                                        
                                    </div>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    <CommentsList items = {[
                                        {
                                            title:"Дмитрий конь",
                                            subtitle:"Да ебланы да посмотрите на них только. Вы клоуны как вы можете вообще такое преподовать, вот у нас в дтт вот там то да, препод на все 100. ее бы сюда к вам преподовать... "
                                        },   {
                                            title:"Дмитрий конь",
                                            subtitle:"Да ебланы да посмотрите на них только. Вы клоуны как вы можете вообще такое преподовать, вот у нас в дтт вот там то да, препод на все 100. ее бы сюда к вам преподовать... "
                                        },   {
                                            title:"Дмитрий конь",
                                            subtitle:"Да ебланы да посмотрите на них только. Вы клоуны как вы можете вообще такое преподовать, вот у нас в дтт вот там то да, препод на все 100. ее бы сюда к вам преподовать... "
                                        },   {
                                            title:"Дмитрий конь",
                                            subtitle:"Да ебланы да посмотрите на них только. Вы клоуны как вы можете вообще такое преподовать, вот у нас в дтт вот там то да, препод на все 100. ее бы сюда к вам преподовать... "
                                        },   {
                                            title:"Дмитрий конь",
                                            subtitle:"Да ебланы да посмотрите на них только. Вы клоуны как вы можете вообще такое преподовать, вот у нас в дтт вот там то да, препод на все 100. ее бы сюда к вам преподовать... "
                                        },   {
                                            title:"Дмитрий конь",
                                            subtitle:"Да ебланы да посмотрите на них только. Вы клоуны как вы можете вообще такое преподовать, вот у нас в дтт вот там то да, препод на все 100. ее бы сюда к вам преподовать... "
                                        },
                                    ]} sx={{width:"60%"}}/>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={2}>
                                    <div className='student_page__tabs__chart'>
                                    <ChartView/>
                                    <ChartView/>
                                    <ChartView/>
                                    <ChartView/>
                                    <ChartView/>
                                    <ChartView/>

                                    </div>
                                </CustomTabPanel>
                        </Box>
                    </div>
                </div>
            </div>
        </section>
    ) 
}

export default TutorPage;