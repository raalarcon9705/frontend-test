import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectChannel,
  selectSelectedChannel,
} from '../store/features/channels';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import MessageItem from './MessageItem';
import { selectLoggedUserId } from '../store/features/auth';

function MessagesList({ channelId }) {
  const ref = useRef();
  const last = useRef();
  const channel = useSelector(selectSelectedChannel);
  const loggedId = useSelector(selectLoggedUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (last.current !== channelId) {
      dispatch(selectChannel(channelId));
      last.current = channelId;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  if (!channel) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  const groups = channel.messages.reduce((arr, msg) => {
    if (!arr.length) {
      arr.push([]);
    } else {
      const count = arr[arr.length - 1].length;
      const last = arr[arr.length - 1][count - 1];
      if (msg.from !== last?.from) {
        arr.push([]);
      }
    }
    arr[arr.length - 1].push(msg);
    return arr;
  }, []);

  const isMy = (messages) => messages[0].from === loggedId;

  return (
    <Box ref={ref}>
      {groups.map((messages, idx) => (
        <Box
          key={idx}
          sx={{
            display: 'flex',
            width: '80%',
            marginLeft: isMy(messages) ? 'auto' : 0,
            flexDirection: isMy(messages) ? 'row-reverse' : 'row',
          }}
        >
          <Avatar src={isMy(messages) ? '' : channel.user.avatar}
            sx={{
              width: '24px',
              height: '24px',
              marginLeft: isMy(messages) ? 2 : 0,
              marginRight: isMy(messages) ? 0 : 2,
              marginTop: 'auto',
              marginBottom: 1,
            }}
          />
          <Box sx={{ flex: 1 }}>
            {messages.map((msg) => (
              <MessageItem key={msg.id} message={msg} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default MessagesList;
