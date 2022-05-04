import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, editMessage, selectEditing, cancelEditing } from '../store/features/channels';
import { grey } from '@mui/material/colors';


function WritingBox() {
  const ref = useRef();
  const [text, setText]= useState('');
  const editing = useSelector(selectEditing);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editing) {
      setText(editing.text);
      ref.current.querySelector('textarea').focus();
    }
  }, [editing]);

  const handleChange = ev => {
    setText(ev.target.value);
  }

  const handleKeyDown = ev => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      ev.stopPropagation();

      submitMessage();
    }
  }

  const submitMessage = () => {
    if (text.trim()) {
      if (editing) {
        dispatch(editMessage(text));
      } else {
        dispatch(addMessage({ from: 0, id: Date.now(), text, date: Date.now() }));
      }
    }
    setText('');
  }

  const handleSubmitClick = ev => {
    ev.preventDefault();
    ev.stopPropagation();

    submitMessage();
  }

  const handleCancelEditing = ev => {
    ev.preventDefault();
    ev.stopPropagation();

    setText('');
    dispatch(cancelEditing());
  }

  return (
    <Box sx={{ marginTop: 1, }}>
      { editing && <Box sx={{ bgcolor: grey[300], p: 1, marginBottom: 1, borderRadius: 2 }}>{editing.text}</Box>}
      <Box component="form"
        sx={{ display: 'flex', '& .MuiOutlinedInput-root': { padding: '6.5px 14px' } }}
        noValidate
        autoComplete="off">
        <TextField ref={ref}
          multiline
          maxRows={4}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          sx={{ flex: 1, marginRight: 1 }}
        />
        <Box sx={{ width: 'fit-content', marginTop: 'auto' }}>
          {!editing && <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmitClick}>
            Send
          </Button>}
          {!!editing && <>
            <IconButton aria-label="delete" onClick={handleCancelEditing}><CloseIcon /></IconButton>
            <IconButton aria-label="delete" onClick={handleSubmitClick}><EditIcon /></IconButton>
          </>}
        </Box>
      </Box>
    </Box>
  );
}

export default WritingBox;