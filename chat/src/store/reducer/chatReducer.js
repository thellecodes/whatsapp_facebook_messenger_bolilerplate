import {
  ACTIVE_ROOM,
  ACTIVE_ROOM_MSGS,
  ACTIVE_USER,
  ADD_MESSAGE,
  ALL_USERS,
  CLEAR_ACTIVE_MSGS,
  INJECT_MESSAGE,
  LOAD_MESSAGES,
} from '../actions/types';

const initialState = {
  users: [],
  activeRoom: null,
  activeUser: null,
  messages: [
    // {
    //   _id: '1',
    //   roomID: '4a760571-e4b5-492c-bfc2-99e0279cde11',
    //   txtMsg: 'hello',
    //   time: '1:08am',
    //   recieverEmail: 'ch1@gmail.com',
    //   senderEmail: 'sam@gmail.com',
    //   sender: false,
    // },
    // {
    //   _id: 'lkajsdfuq2io3ioue7oihd',
    //   roomID: '4a760571-e4b5-492c-bfc2-99e0279cde11',
    //   txtMsg: 'hi',
    //   recieverEmail: 'sam@gmail.com',
    //   senderEmail: 'ch1@gmail.com',
    //   time: '1: 08am',
    //   sender: true,
    // },
    // {
    //   _id: 'lkajsdasdffuq2io3ioue7oihd',
    //   roomID: '4a760571-e4b5-492c-bfc2-99e0279cde11',
    //   txtMsg: 'hi',
    //   recieverEmail: 'sam@gmail.com',
    //   senderEmail: 'ch1@gmail.com',
    //   time: '1: 08am',
    //   sender: true,
    // },
  ],
  activeRoomMsgs: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ALL_USERS:
      return {
        ...state,
        users: payload,
      };
    case ACTIVE_ROOM:
      return {
        ...state,
        activeRoom: payload,
      };
    case ACTIVE_USER:
      return {
        ...state,
        activeUser: payload,
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload],
        activeRoomMsgs: [...state.activeRoomMsgs, payload],
      };
    case INJECT_MESSAGE:
      const {_id} = payload;

      const checkIfMsgIDExists = state.messages.filter(
        ({_id: msgID}) => msgID == _id,
      );

      if (checkIfMsgIDExists.length > 0) {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          messages: [...state.messages, payload],
          activeRoomMsgs: [...state.activeRoomMsgs, payload],
        };
      }
    case LOAD_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, ...payload],
      };
    case ACTIVE_ROOM_MSGS:
      return {
        ...state,
        activeRoomMsgs: payload,
      };
    case CLEAR_ACTIVE_MSGS:
      return {
        ...state,
        activeRoomMsgs: [],
      };
    default:
      return state;
  }
};
