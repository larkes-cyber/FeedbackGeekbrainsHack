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
    const [lections, setLections] = useState(null);
    const [courses, setCourses] = useState(null)

    useEffect(() => {
        setCourses(
            [{
                id:"1",
                name:"Пайтон долбоеб до нуля"
                },{
                    id:"2",
                    name:"Пайтон долбоеб до нуля"
                    },{
                        id:"3",
                        name:"Пайтон долбоеб до нуля"
                        },{
                            id:"4",
                            name:"Пайтон долбоеб до нуля"
                            },{
                                id:"5",
                                name:"Пайтон долбоеб до нуля"
                                }
          ]
        )
        // setLections([ {
        //     title:"Lorem Ipsum",
        //     subtitle:"Lorem Ipsum - это текст- рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой. "
        // },
        // {
        //     title:"Lorem Ipsum",
        //     subtitle:"Lorem Ipsum - это текст- рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой. "
        // },
        // {
        //     title:"Lorem Ipsum",
        //     subtitle:"Lorem Ipsum - это текст- рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой. "
        // },    {
        //     title:"Lorem Ipsum",
        //     subtitle:"Lorem Ipsum - это текст- рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой. "
        // },    {
        //     title:"Lorem Ipsum",
        //     subtitle:"Lorem Ipsum - это текст- рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой. "
        // },    {
        //     title:"Lorem Ipsum",
        //     subtitle:"Lorem Ipsum - это текст- рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой. "
        // },    {
        //     title:"Lorem Ipsum",
        //     subtitle:"Lorem Ipsum - это текст- рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой. "
        // },    {
        //     title:"Lorem Ipsum",
        //     subtitle:"Lorem Ipsum - это текст- рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой. "
        // },    {
        //     title:"Lorem Ipsum",
        //     subtitle:"Lorem Ipsum - это текст- рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой. "
        // }]);
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
                    courses != null ? <LectionsList items={courses} /> : null

                }
                </div>
            </div>
        </section>
    ) 
}

export default TutorPage;