import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import React, { useEffect, useState } from 'react';
import './comments_list.scss'

const CommentsList = (props) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        let newItems = [];
        props.items.forEach(element => {
            newItems.push( <>
                <ListItem 
                onClick={() => {
                    console.log("some...")
                }}
                className='comments_list__item'
                sx={{ padding:0 }}
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
                </ListItem>
            <Divider variant="fullWidth" component="li" sx={{mb:1}} />
            </>);
        });
        setItems(newItems);
    },[]);

    return(
        <List className="comments_list" sx={{bgcolor: 'background.paper', width:'100%', maxHeight:"100vh", padding:0 }}> 
                {items}
        </List>
    );

}

export default CommentsList;