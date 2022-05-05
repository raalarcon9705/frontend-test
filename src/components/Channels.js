import { Link } from "react-router-dom";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';

function Channels({ channels }) {
  return <List>
    {channels.map(ch => {
      const lastMessage = ch.messages[ch.messages.length -1];
      const text = (lastMessage && lastMessage.text) || ' ';
      return (
        <Link key={ch.id} to={`/${ch.id}`}>
          <ListItem button>
            <ListItemAvatar sx={{ mr: .5 }}>
              <Avatar alt={ch.user.firstName} src={ch.user.avatar} />
            </ListItemAvatar>
            <ListItemText primary={ch.user.firstName} secondary={text} />
          </ListItem>
        </Link>
      )
    })}
  </List>
}

export default Channels;
