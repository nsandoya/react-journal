import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
  displayName: '',
  email: 'nat@gmail.com',
  password: ''
}

// ¿Cómo determinar que los datos ingresados son correctos?
const formValidations = { 
  // Condiciones correctas
  // [Valor a evaluar, Mensaje de error] 
  email: [(value) => value.includes('@'), "Tu mail debe incluir una @"],
  password: [(value) => value.length >= 6, "Tu password debe tener más de 6 letras"],
  displayName: [(value) => value.length >= 1, "Hey, seguro tienes un bonito nombre qué compartir :)"],
}

export const RegisterPage = () => {
  const dispatch = useDispatch()

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {status, errorMessage} = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => {
    status === 'checking' // Boolean
    , [status] // Dependency
  })

  const { formState, displayName, email, password, onInputChange, isFormValid, emailValid, passwordValid, displayNameValid } = useForm(formData, formValidations);

  console.log({emailValid, passwordValid, displayNameValid});
  //console.log(isFormValid)

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    
    if(!isFormValid) return;
    // Traemos finalmente nuestra función desde los thunks (ya que es async)
    dispatch(startCreatingUserWithEmailPassword(formState))
    console.log(formState)
  }

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text"
                name='displayName'
                placeholder='Nombre completo' 
                value={displayName} 
                onChange={onInputChange}
                error={!!displayName && formSubmitted}
                helperText={ displayNameValid }
                fullWidth
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                name='email'
                placeholder='correo@google.com' 
                value={email}
                onChange={onInputChange}
                error={!!email && formSubmitted}
                helperText={ emailValid }
                fullWidth
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                name='password'
                placeholder='Contraseña' 
                value={password}
                onChange={onInputChange}
                error={!!password && formSubmitted}
                helperText={ passwordValid }
                fullWidth
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid display={!!errorMessage? '': 'none'}>
                <p>{errorMessage}</p>
              </Grid>

              <Grid item xs={ 12 }>
                <Button 
                  disabled={isCheckingAuthentication}
                  type='submit'
                  variant='contained' 
                  fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                ingresar
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
