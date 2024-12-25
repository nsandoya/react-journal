import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import {useForm} from '../../hooks/useForm'
import { ImageGallery } from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useRef } from 'react';
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles, updateNote } from '../../store/journal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'


export const NoteView = () => {
    const dispatch = useDispatch()

    const {active: note, messageSaved, isSaving} = useSelector(state => state.journal);

    const {body, title, date, imageUrls, onInputChange, formState} = useForm(note);

    const fileInputRef = useRef();
    
    useEffect(() => {
        dispatch(setActiveNote(formState));
        //console.log(formState)
    }, [formState]);

    useEffect(() => {
        if(messageSaved.length > 0){
            Swal.fire('Bien!', messageSaved, 'success')
        }
    }, [messageSaved])

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        console.log(note);
        return newDate.toUTCString();
    }, [date]);

    const onSaveNote = () => {
        dispatch(startSaveNote());
        //console.log(formState);
    }

    const onFileInputChange = ({target}) => {
        //console.log(target.files);
        if (target.files === 0) return;
        dispatch(startUploadingFiles(target.files))
    }

    const onDelete = () => {
        dispatch(startDeletingNote()) // No requerimos pasarle ningún argumento: lo que haremos es borrar la nota activa
    }

    return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>{dateString}</Typography>
        </Grid>
        <Grid item>
            {/* 1. Crear un input para subir las imágenes 
                2. Incorporar el useRef, para que este input se active con otro botón, aunque el 1ero no sea visible
            */}
            <input
                type='file'
                ref={fileInputRef}
                multiple
                onChange={onFileInputChange}   
                style={{display:'none'}} 
            >
            </input>
            {/* 3. Incorporar el useRef para disparar el input que sí usaremos para cargar las imágenes */}
            <IconButton
                color='primary'
                disabled={isSaving}
                onClick={() => fileInputRef.current.click()}
            >
                <UploadOutlined></UploadOutlined>
            </IconButton>

            <Button 
                onClick={onSaveNote}
                disabled={isSaving}
                color="primary" 
                sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>

            <Button
                onClick={onDelete}
                /* sx={{mt:2}} */
                color="error"
            >
                <DeleteOutline />
                Borrar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="¿Cómo se llama tu nota de hoy?"
                name='title'
                value={title}
                onChange={onInputChange}
                /* label="Título" */
                sx={{ border: 'none', mb: 1 }}
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió el día de hoy?"
                name='body'
                value={body}
                onChange={onInputChange}
                minRows={ 5 }
            />
        </Grid>

        <Grid>
            
        </Grid>

        {/* Image gallery */}
        {imageUrls.length > 0 ? <ImageGallery /> : ''}

    </Grid>
  )
}
