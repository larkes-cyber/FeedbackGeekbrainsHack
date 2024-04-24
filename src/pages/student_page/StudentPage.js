import './studentPage.scss';
import LectionsList from '../../components/list/LectionsList';
import CustomTabPanel from '../../components/tabs/Tabs';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as React from 'react';
import ChartView from './views/ChartView';
import Divider from '@mui/material/Divider';



const StudentPage = () => {
    
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  

    return(
        <section className='student_page'>
            <div className='container'>
                <div className='student_page__wrapper'>
                    <div className='student_page__lections'>
                        <Typography
                                sx={{ display: 'inline', mb:1.5, mt:1.5 }}
                                component="span"
                                variant="h5"
                                color="text.primary"
                            >
                            Мои лекции
                        </Typography>
                       <LectionsList items = {[
                        {
                            title:"Lorem Ipsum",
                            subtitle:"Lorem Ipsum - это текст- рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой. "
                        },
                        {
                            title:"Lorem Ipsum",
                            subtitle:"Lorem Ipsum - это текст- рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой. "
                        },
                        {
                            title:"Lorem Ipsum",
                            subtitle:"Lorem Ipsum - это текст- рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой. "
                        },    {
                            title:"Lorem Ipsum",
                            subtitle:"Lorem Ipsum - это текст- рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой. "
                        },    {
                            title:"Lorem Ipsum",
                            subtitle:"Lorem Ipsum - это текст- рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой. "
                        },    {
                            title:"Lorem Ipsum",
                            subtitle:"Lorem Ipsum - это текст- рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой. "
                        },    {
                            title:"Lorem Ipsum",
                            subtitle:"Lorem Ipsum - это текст- рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой. "
                        },    {
                            title:"Lorem Ipsum",
                            subtitle:"Lorem Ipsum - это текст- рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой. "
                        },    {
                            title:"Lorem Ipsum",
                            subtitle:"Lorem Ipsum - это текст- рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой. "
                        },
                       ]}/>
                    </div>
                    <div className='student_page__tabs'>
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
                            Item Two
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

export default StudentPage;