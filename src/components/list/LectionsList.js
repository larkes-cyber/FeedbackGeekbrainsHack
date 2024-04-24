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

const LectionsList = () => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        let newItems = [];
        for(let i = 0; i < 15; i++){
            newItems.push( <>
                <ListItem 
                alignItems="flex-start"
                onClick={() => {
                    console.log("some...")
                }}
                className='lections_list__item'
                >
                    <ListItemAvatar>
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                    primary="Summer BBQ"
                    secondary={
                        <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            to Scott, Alex, Jennifer
                        </Typography>
                        {" — Wish I could come, but I'm out of town this…"}
                        </React.Fragment>
                    }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </>);
            setItems(newItems);
        }
    },[]);

    console.log(items)

    return(
        <div className='lections_list'>
            <List sx={{bgcolor: 'background.paper', maxHeight:"100vh" }}> 
                    {items}
            </List>
        </div>
    )

}

export default LectionsList;