import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { selectAllChannels } from '../store/features/channels';
import { useNavigate } from 'react-router';

function Users({ users }) {
  const channels = useSelector(selectAllChannels);
  const navigate = useNavigate();

  const handleClick = (user) => {
    const channel = channels.find(ch => ch.user.id === user.id);
    if (channel) {
      navigate(`/${channel.id}`);
    }
  }

  return (
    <List sx={{ display: 'flex', maxWidth: '100%', overflowX: 'auto', minHeight: '80px'}}>
      {users.map(user => (
        <Tooltip key={user.id} title={user.firstName}>
          <ListItem button sx={{ p: 1 }} onClick={() => handleClick(user)}>
            <ListItemAvatar sx={{ minWidth: 'unset', width: 'fit-content' }}>
              <Avatar alt={user.firstName} src={user.avatar} />
            </ListItemAvatar>
          </ListItem>
        </Tooltip>
      ))}
    </List>
  )
}

export default Users;
