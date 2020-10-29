import IO from 'socket.io-client';
import {
  ACTIVE_ROOM,
  ACTIVE_ROOM_MSGS,
  ACTIVE_USER,
  ADD_MESSAGE,
  ALL_USERS,
  API_URI,
  CLEAR_ACTIVE_MSGS,
  INJECT_MESSAGE,
  LOAD_MESSAGES,
} from './types';
import {uuidv4} from '../../Utils';
import AsyncStorage from '@react-native-community/async-storage';

//** Socket Config */
export const socket = IO(`${API_URI}`, {
  forceNew: true,
});

socket.on('connection', () => console.log('Connection'));

export const LoadMessages = () => async (dispatch, getState) => {
  const {
    user: {email: myEmail},
  } = getState().auth;

  socket.emit('sentMsgs', {myEmail}, (data) => {
    const myMsgs = data.map((data) => {
      return {
        ...data,
        sender: myEmail == data.senderEmail,
      };
    });
    dispatch({type: LOAD_MESSAGES, payload: myMsgs});
  });

  socket.emit('recievedMsgs', {myEmail}, (data) => {
    const myMsgs = data.map((data) => {
      return {
        ...data,
        sender: myEmail == data.senderEmail,
      };
    });

    dispatch({type: LOAD_MESSAGES, payload: myMsgs});
  });
};

export const ChatUserList = () => async (dispatch, getState) => {
  const {user} = getState().auth;
  const uniqueChat = JSON.parse(await AsyncStorage.getItem('@unique_Chat'));
  const uniqueRoomChat = JSON.parse(
    await AsyncStorage.getItem('@unique_RoomChat'),
  );

  if (!uniqueChat) {
    AsyncStorage.setItem('@unique_Chat', JSON.stringify([]));
  }

  if (!uniqueRoomChat) {
    AsyncStorage.setItem('@unique_RoomChat', JSON.stringify([]));
  }

  //* Set current user *//
  dispatch({type: ACTIVE_USER, payload: user.email});

  //* Emit to get users *//
  socket.emit('getUsers');

  // //** Get all users and dispatch *//
  socket.on('getAllUsers', (users) => {
    const allUsers = users
      .filter(({email}) => email !== user.email)
      .map(({email, name, _id}) => ({
        email,
        name,
        _id,
        time: '1:00',
        msg: 'last msg',
      }));

    dispatch({
      type: ALL_USERS,
      payload: allUsers,
    });
  });

  dispatch(LoadMessages());
};

export const uniqueUserChat = ({_id, email, name}) => async (
  dispatch,
  getState,
) => {
  const {
    user: {email: senderEmail},
  } = getState().auth;
  // check if there is an id in phone if not emit to gen id
  const uniqueChat = JSON.parse(await AsyncStorage.getItem('@unique_Chat'));

  const uniQueChatData = {
    senderEmail,
    recieverEmail: email,
    recieverID: _id,
    recieverName: name,
  };

  if (uniqueChat.length > 0) {
    const User = uniqueChat.filter(
      ({recieverEmail}) => recieverEmail === email,
    );

    if (User.length > 0) {
      const {recieverEmail, recieverID, recieverName} = User[0];
      dispatch(
        onUniqueChat({senderEmail, recieverEmail, recieverID, recieverName}),
      );
    } else {
      dispatch(onUniqueChat({...uniQueChatData, senderEmail}));
      uniqueChat.push(uniQueChatData);
      AsyncStorage.setItem('@unique_Chat', JSON.stringify(uniqueChat));
    }
  } else {
    uniqueChat.push(uniQueChatData);
    AsyncStorage.setItem('@unique_Chat', JSON.stringify(uniqueChat));
  }
};

export const onUniqueChat = ({
  senderEmail,
  recieverEmail,
  recieverID,
}) => async (dispatch) => {
  const uniqueRoomChat = JSON.parse(
    await AsyncStorage.getItem('@unique_RoomChat'),
  );

  socket.emit(
    'startUniqueChat',
    {recieverEmail, senderEmail, recieverID},
    (error) => {},
  );

  socket.on('openChat', ({recieverEmail, senderEmail, roomID}) => {
    const mobileRoom = {
      recieverEmail,
      senderEmail,
      roomID,
    };

    const MobileRoomExits = uniqueRoomChat.filter(
      ({roomID: mRoomID}) => mRoomID === roomID,
    );

    if (MobileRoomExits.length > 0) {
      socket.emit('joinTwoUsers', {roomID}, ({roomID}) => {
        dispatch({type: ACTIVE_ROOM, payload: roomID});
      });
    } else {
      uniqueRoomChat.push(mobileRoom);
      AsyncStorage.setItem('@unique_RoomChat', JSON.stringify(uniqueRoomChat));

      socket.emit('joinTwoUsers', {roomID}, ({roomID}) => {
        dispatch({type: ACTIVE_ROOM, payload: roomID});
      });
    }
  });
};

export const sendMsg = ({txtMsg, reciever}) => async (dispatch, getState) => {
  const date = new Date();

  const {activeUser, activeRoom} = getState().chat;

  const composeMsg = {
    _id: uuidv4(),
    roomID: activeRoom,
    txtMsg,
    recieverEmail: reciever,
    senderEmail: activeUser,
    time: `${date.getHours()}:${date.getMinutes()}`,
    sender: true,
  };

  dispatch({type: ADD_MESSAGE, payload: composeMsg});
  socket.emit('sendTouser', {
    roomID: activeRoom,
    senderEmail: activeUser,
    recieverEmail: reciever,
    composeMsg,
  });
};

export const handleDispatchMsg = () => async (dispatch) => {
  socket.on('dispatchMsg', (data) => {
    dispatch(getDispatchMsg({...data}));
  });
};

export const getDispatchMsg = ({
  _id,
  roomID,
  senderEmail,
  recieverEmail,
  composeMsg: composedMsg,
}) => async (dispatch, getState) => {
  const {activeUser} = getState().chat;

  const msg = {
    _id,
    ...composedMsg,
    sender: activeUser == senderEmail,
    senderEmail,
    recieverEmail,
    roomID,
  };

  dispatch({type: INJECT_MESSAGE, payload: msg});
};

export const LoadRoomMsgs = () => async (dispatch, getState) => {
  const {activeRoom, messages, activeUser} = getState().chat;

  new Promise((res) => {
    res();
  }).then(() => {
    const activeRoomMsgs = messages
      .filter(({roomID}) => roomID == activeRoom)
      .map((data) => {
        return {
          ...data,
          sender: activeUser == data.senderEmail,
        };
      });
    dispatch({type: ACTIVE_ROOM_MSGS, payload: activeRoomMsgs});
  });
};

export const clearActiveMsgs = () => async (dispatch) => {
  dispatch({type: CLEAR_ACTIVE_MSGS});
};
