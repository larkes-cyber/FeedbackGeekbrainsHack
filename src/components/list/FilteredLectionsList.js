import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import React, { useEffect, useState } from 'react';
import './lections_list.scss';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Card } from '@mui/material';


const FilteredLectionsList = (props) => {

    const [items, setItems] = useState([]);
    const [selectedLection, setSelectedLection] = useState(null);
   
    useEffect(() => {
        let newItems = [];
        console.log(props.items);
        props.items.forEach(item => {
            newItems.push(
                <Card
                    elevation={props.selectedLection==item.id ? 8 : 2}
                    sx={{mb:1, ml:1, mr:5, mt:1, width:"95%" }}
                    >
                    <ListItemButton onClick={() => {
                        props.lectionCallback(item.id);
                        }} sx={{ padding:1}} >
                            <ListItemText
                                primary = {
                                item.title
                                }
                                secondary = {
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {item.titleCourse}
                                        </Typography>
                                    {item.description}
                                    </React.Fragment>
                                }/>
                    </ListItemButton>
                </Card>
            );
        });
        setItems(newItems);
    },[props]);


    return(
        <div className='lections_list'>
            <List sx={{bgcolor: 'background.paper', width:'100%', maxHeight:"100vh", padding:0 }}> 
                    {items}
            </List>
        </div>
    )

}

const ExpendLection = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(!open);
    };
  

    return(
        <>
          
      </>
    )

}


export default FilteredLectionsList;