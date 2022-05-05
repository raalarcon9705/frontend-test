import { useDispatch, useSelector } from "react-redux";
import { useOnce } from "../common/hooks";
import { loadChannels, selectAllChannels, selectChannelsLoading } from "../store/features/channels";
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Toolbar from '@mui/material/Toolbar';
import Channels from "./Channels";
import { selectAllUsers } from "../store/features/users";
import Users from "./Users";

const drawerWidth = 240;


function Sidebar() {
  const channels = useSelector(selectAllChannels);
  const users = useSelector(selectAllUsers);
  const loading = useSelector(selectChannelsLoading);
  const dispatch = useDispatch();

  useOnce(() => {
    dispatch(loadChannels())
  }, [dispatch]);

  const sorted = channels.sort((a, b) => {
    const lastA = a.messages.slice(-1).pop();
    const lastB = b.messages.slice(-1).pop();
    return lastB.date - lastA.date;
  })

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
        },
      }}
      variant="permanent"
      anchor="left">
      <Toolbar />
      <Divider />
      {loading && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>}
      {!loading && <Users users={users} />}
      {!loading && <Divider />}
      {!loading && <Channels channels={sorted} />}
    </Drawer>
  );
}

export default Sidebar;