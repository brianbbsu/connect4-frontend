import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Box, Grid } from '@material-ui/core';

import { ChatRoom } from './ChatRoom';
import { Board } from './Board';
import { getToken, deleteToken } from '../api';
import { unknownGameInfo, GameInfoContext } from '../contexts';
import { ROUTE_HOME, SOCKET_CHAT, SOCKET_GAME } from '../constants';

function GamePage({ authorizeAndSetUser }) {
  const { gameID } = useParams();
  const chatID = gameID;

  const [chatSocket, setChatSocket] = useState({
    validChat: null,
    socket: null
  });

  const [gameSocket, setGameSocket] = useState({
    validGame: null,
    socket: null
  });

  const [messages, setMessages] = useState([]);
  const [moves, setMoves] = useState([]);
  const [gameInfo, setGameInfo] = useState(unknownGameInfo);

  useEffect(() => {
    console.log('creating chat socket');
    const socket = io(SOCKET_CHAT, {
      auth: {
        token: getToken(),
      }
    });
    socket.on('connect', () => {
      console.log('chat connected');
      socket.emit('join', chatID, pastMessages => {
        console.log('got past messages', pastMessages);
        if (pastMessages === null) {
          setChatSocket({
            validChat: false,
            socket: null
          });
          return;
        }
        setMessages(pastMessages);
        setChatSocket({
          validChat: true,
          socket: socket
        });
      });
    });
    return () => {
      setChatSocket({
        validChat: null,
        socket: null
      });
    };
  }, [chatID]);

  useEffect(() => {
    console.log('creating game socket');
    const socket = io(SOCKET_GAME, {
      auth: {
        token: getToken(),
      }
    });
    socket.on('connect', () => {
      console.log('game connected');
      socket.emit('join', gameID, gameObj => {
        console.log('got game object', gameObj);
        if (gameObj === null) {
          setGameSocket({
            validGame: false,
            socket: null
          });
          return;
        }
        const pastMoves = gameObj.moves;
        setMoves(pastMoves);
        setGameInfo({
          status: gameObj.status,
          player1: gameObj.player1,
          player2: gameObj.player2
        });
        setGameSocket({
          validGame: true,
          socket: socket
        });
      });
    });
    return () => {
      setGameSocket({
        validGame: null,
        socket: null
      });
    };
  }, [gameID]);

  const history = useHistory();

  useEffect(() => {
    console.log('chat effect');
    if (chatSocket.validChat === true) {
      console.log('true');
      const disconnectHandler = reason => {
        console.log('disconncted');
        if (reason === 'io server disconnect') {
          console.log('server disconnected');
          deleteToken();
          history.push(ROUTE_HOME);
          authorizeAndSetUser();
        }
      };

      const newMessageHandler = newMessage => {
        setMessages(oldMessages => [...oldMessages, newMessage]);
      };

      chatSocket.socket.on('disconnect', disconnectHandler);
      chatSocket.socket.on('newmsg', newMessageHandler);
      return () => {
        console.log('leaving chat');
        chatSocket.socket.emit('leave');
        chatSocket.socket.close();
      };
    }
  }, [chatSocket, history, authorizeAndSetUser]);

  useEffect(() => {
    console.log('game effect');
    if (gameSocket.validGame === true) {
      console.log('true');
      const disconnectHandler = reason => {
        console.log('disconncted');
        if (reason === 'io server disconnect') {
          console.log('server disconnected');
          deleteToken();
          history.push(ROUTE_HOME);
          authorizeAndSetUser();
        }
      };

      const newMoveHandler = newMoveObj => {
        setMoves(oldMoves => [...oldMoves, newMoveObj.move]);
        setGameInfo(oldGameInfo => ({
          ...oldGameInfo,
          status: newMoveObj.status,
        }));
      };

      gameSocket.socket.on('disconnect', disconnectHandler);
      gameSocket.socket.on('newmove', newMoveHandler);
      return () => {
        console.log('leaving game');
        gameSocket.socket.emit('leave');
        gameSocket.socket.close();
      };
    }
  }, [gameSocket, history, authorizeAndSetUser]);

  useEffect(() => {
    console.log('moves updated', moves);
  }, [moves]);

  const sendMessage = chatSocket.validChat ? (content => {
    console.log('send message', content);
    chatSocket.socket.emit('sendmsg', content);
  }) : (() => {});

  const sendMove = gameSocket.validGame ? (move => {
    console.log('send move', move);
    gameSocket.socket.emit('makemove', move);
  }) : (() => {});

  return (
    <GameInfoContext.Provider value={gameInfo}>
      <Box p={2} m={2}>
        <Grid container spacing={2}>
          <Grid item xs>
          </Grid>
          <Grid item xs={6}>
            <Board moves={moves} sendMove={sendMove} valid={gameSocket.validGame} />
          </Grid>
          <Grid item xs style={{minWidth: '0%'}}>
            <ChatRoom messages={messages} sendMessage={sendMessage} valid={chatSocket.validChat} />
          </Grid>
        </Grid>
      </Box>
    </GameInfoContext.Provider>
  );
}

export { GamePage };
