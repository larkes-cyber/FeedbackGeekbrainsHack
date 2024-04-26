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
                <div className='tutor_page__lection_wrapper'>
                <Typography
                        sx={{ display: 'inline', mt:"20px", ml:"1%"}}
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
            </div>
        </section>
    ) 
}

export default TutorPage;