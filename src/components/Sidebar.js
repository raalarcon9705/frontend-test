import { useDispatch, useSelector } from "react-redux";
import { useOnce } from "../common/hooks";
import { loadChannels, selectAllChannels, selectChannelsLoading } from "../store/features/channels";
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Toolbar from '@mui/material/Toolbar';
import { Link } from "react-router-dom";

const drawerWidth = 240;


function Sidebar() {
  const channels = useSelector(selectAllChannels);
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
      {!loading && <List>
        {sorted.map(ch => {
          const lastMessage = ch.messages[ch.messages.length -1];
          const text = (lastMessage && lastMessage.text) || ' ';
          return (
            <Link key={ch.id} to={`/${ch.id}`}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar alt={ch.user.firstName} src={ch.user.avatar} />
                </ListItemAvatar>
                <ListItemText primary={ch.user.firstName} secondary={text} />
              </ListItem>
            </Link>
          )
        })}
      </List>}
    </Drawer>
  );
}

export default Sidebar;