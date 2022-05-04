import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import MoreIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedUserId } from '../store/features/auth';
import moment from 'moment';
import { useState } from 'react';
import { removeMessage, setEditing } from '../store/features/channels';

function MessageItem({ message }) {
  const loggedId = useSelector(selectLoggedUserId);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const isMy = message.from === loggedId;

  const handleOpen = ev => {
    setAnchorEl(ev.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setOpenDialog(true);
    handleClose();
  }

  const handleEditClick = () => {
    dispatch(setEditing(message.id));
    handleClose();
  }

  const handleCloseDialog = () => setOpenDialog(false);

  const handleAcceptDelete = () => {
    dispatch(removeMessage(message.id));
    handleCloseDialog();
  }

  return (
    <Box sx={{
      marginBottom: 1,
      borderRadius: 2,
      p: 1,
      backgroundColor: isMy ? 'primary.main' : 'secondary.light',
      color: '#fff',
      width: 'fit-content',
      marginLeft: isMy ? 'auto' : 0,
      position: 'relative',
      '&:hover .option': { display: 'block' } }}>
      <Tooltip title={moment(message.date).fromNow()}>
        <Box sx={{ wordBreak: 'break-word', lineHeight: 1, width: 'fit-content', marginLeft: isMy ? 'auto' : 0 }}>
          <Box component="span">{ message.text }</Box>
        </Box>
      </Tooltip>
      {isMy && <Box className="option" sx={{ position: 'absolute', top: -4, left: isMy ? -40 : '100%', display: !anchorEl ? 'none' : ''}}>
        <IconButton aria-label="delete" onClick={handleOpen}>
          <MoreIcon />
        </IconButton>
      </Box>}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}>
        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
      </Menu>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this message?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          You will not be able to recover the deleted message
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAcceptDelete} autoFocus>Accept</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}

export default MessageItem;