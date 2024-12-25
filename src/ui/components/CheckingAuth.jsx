import { Grid } from '@mui/material'
import React from 'react'

export const CheckingAuth = () => {
  return (
    <>
        <Grid
            container
            spacing={ 0 }
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
        >

            <Grid item
                className='box-shadow'
                xs={ 3 }
                sx={{ 
                    width: { sm: 450 },
                    backgroundColor: 'white', 
                    padding: 3, 
                    borderRadius: 2 
            }}/>
        </Grid>        
    </>
  )
}

//export default CheckingAuth
