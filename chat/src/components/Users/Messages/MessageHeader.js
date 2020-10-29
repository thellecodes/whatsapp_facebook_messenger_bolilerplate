import React from 'react';
import {Image} from 'react-native';
import {useSelector} from 'react-redux';
import {Back} from '../../../Icons';
import {Call, Oval, user, Video} from '../../../images';
import {Box, Text} from '../../theme';

export default function MessageHeader({_id, email}) {
  const {users} = useSelector((state) => state.chat);
  const {name} = users.filter(({email: userEmail}) => userEmail == email)[0];

  return (
    <Box
      paddingHorizontal="m"
      paddingVertical="m"
      flexDirection="row"
      alignItems="center"
      backgroundColor="white">
      <Back size={24} />
      <Box style={{marginLeft: 32}} position="relative">
        <Image
          source={user}
          style={{
            height: 33,
            width: 33,
          }}
          resizeMode="contain"
        />
        <Image
          source={Oval}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 2,
            height: 7,
            width: 7,
          }}
        />
      </Box>
      <Box marginLeft="l" flexDirection="column">
        <Text fontSize={20} variant="smtitle" color="text">
          {name}
        </Text>
        <Text fontSize={12}>Last seen 5 minutes ago</Text>
      </Box>
      <Box
        flexDirection="row"
        marginLeft="l"
        alignItems="center"
        justifyContent="flex-end">
        <Image source={Video} style={{marginRight: 22}} />
        <Image source={Call} />
      </Box>
    </Box>
  );
}
