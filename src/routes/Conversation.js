import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import MessagesList from '../components/MessagesList';
import WritingBox from '../components/WritingBox';

function Conversation() {
  const { id } = useParams();

  return <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
    <Box sx={{ flex: 1, overflowY: 'auto'}}>
      <MessagesList channelId={id} />
    </Box>
    <WritingBox />
  </Box>
}

export default Conversation;