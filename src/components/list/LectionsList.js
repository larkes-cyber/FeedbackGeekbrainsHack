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




const LectionsList = (props) => {

    const [items, setItems] = useState([]);

   

    useEffect(() => {
        let newItems = [];
        props.items.forEach(element => {
            newItems.push(
                <ExpendLection course={element.course} lections={element.lections} lectionCallback={props.lectionCallback} />
            );
        });
        setItems(newItems);
    },[]);

    console.log(items)

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
            <Card
            elevation={2}
            sx={{mb:1, ml:1, mr:5, mt:1, width:"95%" }}
            >
                <ListItemButton onClick={handleClick} sx={{ padding:1}} >
                    <ListItemText
                        primary = {
                            props.course.name
                        }
                    />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </Card>
          <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
              {
                props.lections.map((item) => {
                    return(
                            <Card
                                elevation={2}
                                sx={{mb:1, ml:1, mr:5, mt:1, width:"95%" }}
                                >
                                 <ListItemButton onClick={() => {
                                    props.lectionCallback(item.id);
                                }} sx={{ padding:1}} >
                                    <ListItemText
                                        primary = {
                                        item.name
                                        }
                                        secondary = {
                                            item.description
                                        }
                                    />
                                </ListItemButton>
                            </Card>
                    )
                })
              }
              </List>
          </Collapse>
      </>
    )

}


export default LectionsList;