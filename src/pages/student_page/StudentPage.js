import './studentPage.scss';
import LectionsList from '../../components/list/LectionsList';
import CustomTabPanel from '../../components/tabs/Tabs';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as React from 'react';


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
                       <div className='student_page__lections__title'>Список ваших лекций</div> 
                       <LectionsList/>
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
                            Item Three
                            </CustomTabPanel>
                        </Box>
                    </div>
                </div>
            </div>
        </section>
    ) 
}

export default StudentPage;