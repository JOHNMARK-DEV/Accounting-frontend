"use client"
import { VisibilityOff, Visibility, Label } from '@mui/icons-material'
import { Autocomplete, Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import Image from 'next/image' 
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  
  const router = useRouter();
  return (
    <div className='h-100'>
      <Grid container rowSpacing={2} className='m-auto' width={'20%'}>
        <Grid item lg={12} className='flex flex-col items-center'>
          <img style={{height:'162px'}} src="https://seeklogo.com/images/A/accounting-logo-E018889838-seeklogo.com.png" alt="" />
        </Grid>
        <Grid item lg={12} className='flex flex-col items-center'>
          <Typography variant="h3" component="h2">
            Login
          </Typography>
          <Typography variant="h5" component="h5">
            Enter your credentials to continue
          </Typography>
        </Grid>
        <Grid item lg={12}>
          <TextField id="outlined-basic" size="small" fullWidth label="Email" variant="outlined" />
        </Grid>
        <Grid item lg={12}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Grid>
        <Grid item lg={12}>
          <Button fullWidth style={{ backgroundColor: 'blue',color:'white' }} onClick={()=>router.push("/Dashboard")}>Sign in</Button>
        </Grid>
      </Grid>
    </div>
  )
}
