import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import './lections_list.scss';
import { width } from '@mui/system';
import { Card } from '@mui/material';


const LectionsList = (props) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        let newItems = [];
        props.items.forEach(element => {
            newItems.push( <>
                <Card 
                sx={{ padding:1, mb:1, ml:1, mr:5, mt:1 }}
                elevation={2}
                >
                    <ListItemText
                        primary = {
                            element.title
                        }
                        secondary={
                            <React.Fragment>
                                {element.subtitle}
                            </React.Fragment>
                        }
                    />
                </Card>
            </>);
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

export default LectionsList;