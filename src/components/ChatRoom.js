import { useState, useContext } from 'react';
import { Box, Paper, Typography, TextField, Button, List, ListItem, Grid } from '@material-ui/core';

import { UserProfileLink } from './UserProfileLink';
import { UserContext, GameContext } from '../contexts';

function ChatRoom({ messages, sendMessage, valid }) {
  const user = useContext(UserContext);

  const [content, setContent] = useState('');

  const authorized = user.authorized;

  const handleSend = () => {
    if (content !== '') {
      sendMessage(content); 
      setContent('');
    }
  };

  if (valid === null) {
    return (
      <Box p={2} height={1} component={Paper}>
      </Box>
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
        <Typography variant="h3">
          Chat Room
        </Typography>
      </Box>
      <Box flexGrow={1} flexBasis={0} minHeight={0} component={Paper} variant="outlined" overflow="auto">
        <List>
          { messages.map((message, idx) => (
            <ListItem key={idx}>
              <Typography>
                <UserProfileLink username={message.from} />: {message.content}
              </Typography>
            </ListItem>
          )) }
        </List>
      </Box>
      <Box flexGrow={0}>
        <TextField 
          value={content} 
          onChange={e => setContent(e.target.value)} 
          disabled={!authorized} 
          id="content" 
          label="Content"
          onKeyPress={(e)=>{
            if(e.key === "Enter")
              handleSend();
          }}
        />
        <Box mt={1}>
          <Button 
            variant="contained" 
            disabled={!authorized}
            onClick={handleSend}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export { ChatRoom };
