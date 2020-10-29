import React, {useEffect} from 'react';
import UserHeader from './UserHeader';
import {Image, TouchableWithoutFeedback} from 'react-native';
import {Box, Text} from '../theme';
import TopStatus from './TopSearch/TopStatus';
import Users from './Users';
import {Bot} from '../../images';
import {useDispatch} from 'react-redux';
import {ChatUserList} from '../../store/actions/chatAction';
import {logout} from '../../store/actions/dist/authActions';
import {useNavigation} from '@react-navigation/native';

export default function UserList() {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();

  const onLogOut = () => {
    dispatch(logout());
    navigate('Auth');
  };

  useEffect(() => {
    dispatch(ChatUserList());
  }, []);

  return (
    <Box backgroundColor="white" flex={1} position="relative">
      <UserHeader back={false} />
      <TopStatus />
      <Box marginTop="s" flex={1} backgroundColor="dgrey" padding="m">
        <Text fontFamily="Rubik-Bold" variant="title" color="primary">
          Chats
        </Text>
        <Users />
      </Box>

      <TouchableWithoutFeedback onPress={onLogOut}>
        <Box position="absolute" bottom={10} right={20}>
          <Image source={Bot} />
        </Box>
      </TouchableWithoutFeedback>
    </Box>
  );
}
