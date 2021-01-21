import { useState, useContext, useRef, useEffect } from 'react';
import { Box, Paper, Typography, TextField, IconButton, List, ListItem, Grid, InputAdornment} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import { UserProfileLink } from './UserProfileLink';
import { UserContext } from '../contexts';

function ChatRoom({ messages, sendMessage, valid }) {
  const user = useContext(UserContext);
  const [content, setContent] = useState('');
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messageEndRef.current)
      messageEndRef.current.scrollIntoView({behavior: "smooth"});
  };

  useEffect(scrollToBottom, [messages, valid]);

  const authorized = user.authorized;

  const handleSend = () => {
    if (content !== '') {
      sendMessage(content);
      setContent('');
    }
  };

  if (valid === null) {
    return (
      <></>
    );
  }

  if (valid === false) {
    return (
      <Box p={2} height={1} component={Paper}>
        <Typography>
          Invalid Chat ID
        </Typography>
      </Box>
    );
  }


  return (
    <Box p={2} component={Paper} height={1} display="flex" flexDirection="column">
      <Box flexGrow={0}>
        <Typography variant="h4">
          Chat Room
        </Typography>
      </Box>
      <Box flexGrow={1} flexBasis={0} minHeight={0} component={Paper} variant="outlined" overflow="auto">
        <List>
          {messages.map((message, idx) => (
            <ListItem key={idx}>
              <Typography>
                <UserProfileLink username={message.from} />: {message.content}
              </Typography>
            </ListItem>
          ))}
        </List>
        <div ref={messageEndRef}/>
      </Box>
      <Grid container alignItems="flex-end">
        <Grid item xs={12}>
          <TextField
            value={content}
            onChange={e => setContent(e.target.value)}
            disabled={!authorized}
            id="content"
            label={authorized ? "Content" : "Sign in to send messages"}
            margin="normal"
            fullWidth
            onKeyPress={(e) => {
              if (e.key === "Enter")
                handleSend();
            }}
            InputProps={{
              endAdornment: 
                <InputAdornment position="end">
                  <IconButton
                    disabled={!authorized}
                    onClick={handleSend} 
                    edge="end"
                    color={content.length > 0 ? "primary" : "default"}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export { ChatRoom };
