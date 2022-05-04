import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectAuthLoading, selectLoggedUser } from '../store/features/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loggedUser = useSelector(selectLoggedUser);
  const loading = useSelector(selectAuthLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (!!loggedUser) {
      navigate('/');
    }
  }, [loggedUser, navigate])

  const handleSubmit = ev => {
    ev.preventDefault();

    dispatch(login({ email, password }))
  }

  return (
    <Grid>
      <Paper elevation={10} sx={{ padding: '20px', height: '70vh', width: 280, margin: '24px auto'}}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Avatar><LockOutlinedIcon /></Avatar>
          <Box component="h1">Sign in</Box>
        </Box>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField placeholder="Enter email" type="email" value={email} onInput={ev => setEmail(ev.target.value)} fullWidth required sx={{ marginBottom: 2 }} />
          <TextField placeholder="Enter password" type="password" value={password} fullWidth onInput={ev => setPassword(ev.target.value)} required sx={{ marginBottom: 2 }} />

          <Button type="submit" color="primary" variant="contained" fullWidth disabled={loading}> Sign in</Button>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Login;
