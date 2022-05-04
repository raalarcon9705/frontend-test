import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Sidebar from './Sidebar';
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectSelectedChannel } from '../store/features/channels';

const drawerWidth = 240;

function Dashboard() {
  const channel = useSelector(selectSelectedChannel);
  
  const name = channel?.user.firstName;
  const avatar = channel?.user.avatar;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          { avatar && <Avatar alt={name} src={avatar} sx={{ marginRight: 2 }}/> }
          <Typography variant="h6" noWrap component="div">{ name }</Typography>
        </Toolbar>
      </AppBar>
      <Sidebar />
      <Box component="main" sx={{ 
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 2,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 9 }} >
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;