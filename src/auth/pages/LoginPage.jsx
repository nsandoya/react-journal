import {useDispatch, useSelector} from 'react-redux'
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import {checkingAuthentication, startGoogleSingin, startLoginWithEmailPassword} from '../../store/auth'
import { useMemo } from 'react';

const formData = {
  email: 'nat@gmail.com',
  password: 'whatpassword'
}

export const LoginPage = () => {
  const { email, password, onInputChange, formState } = useForm(formData)

  const dispatch = useDispatch();
  const {status, errorMessage} = useSelector(state => state.auth);

  // Tareas asíncronas
  const onSubmit = (event) => {
    event.preventDefault();
    console.log({email, password})
    // En realidad, esta no es la acción a despachar
    // Pendiente: crear la verdadera acción de login
    dispatch(startLoginWithEmailPassword({email, password}))
    //dispatch(checkingAuthentication())
  }

  const onGoogleSignIn = () => {
    console.log("On Google sing-in")

    dispatch(startGoogleSingin())
  };

  // useMemo will only recompute the memoized value when one of the deps has changed.
  const isAuthenticating = useMemo(() => status === 'checking', [status])

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name='email'
                value={email}
                onChange={onInputChange}
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name='password'
                value={password}
                onChange={onInputChange}
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid display={!!errorMessage? '': 'none'}>
                <p>{errorMessage}</p>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                  type='submit' 
                  variant='contained' 
                  disabled={isAuthenticating}
                  fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                  onClick={onGoogleSignIn} variant='contained' 
                  disabled={isAuthenticating}
                  fullWidth>
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
