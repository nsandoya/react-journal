import { TurnedInNot } from '@mui/icons-material'
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Grid } from '@mui/material'
import React, { useMemo } from 'react'
import { setActiveNote } from '../../store/journal';
import { useDispatch } from 'react-redux';

export const SidebarItem = ({id, title, body, date, imageUrls = []}) => {
    const dispatch = useDispatch()

    const onSelectNote = (note) => {
        dispatch(setActiveNote(note));
        //console.log(note)
    };

    const newTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0,17) + '...'
            : title
    }, [title]);

    
  return (
    <>
        <ListItem 
            onClick={() => onSelectNote({id, title, body, date, imageUrls})}
            disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={ newTitle } />
                    <ListItemText secondary={ body } />
                </Grid>
            </ListItemButton>
        </ListItem>
    </>
  )
}

//export default SidebarItem
