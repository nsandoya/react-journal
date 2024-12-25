import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { startLogOut } from '../../store/auth';


export const NavBar = ({ drawerWidth = 240 }) => {
    const dispatch = useDispatch();
    const onLogout = () => {
        // Hay que tomar en cuenta que esta no es una tarea asíncrona:
        // - Hay que enviar un request y recibir respuesta
        // - Hay que limpiar el store de las credenciales antes ingresadas
        dispatch(startLogOut())
    }

  return (
    <AppBar 
        position='fixed'
        sx={{ 
            width: { sm: `calc(100% - ${ drawerWidth }px)` },
            ml: { sm: `${ drawerWidth }px` }
         }}
    >
        <Toolbar>
            <IconButton
                color='inherit'
                edge="start"
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuOutlined />
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' noWrap component='div'> JournalApp </Typography>

                <IconButton 
                    color='error'
                    onClick={onLogout}>
                    <LogoutOutlined />
                </IconButton>
            </Grid>

        </Toolbar>
    </AppBar>
  )
}
