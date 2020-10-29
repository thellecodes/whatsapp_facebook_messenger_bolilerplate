import React from 'react';
import {Box} from '../theme';
import UserHeader from './UserHeader';

export default function UserChat() {
  return (
    <Box flex={1} padding="l">
      <UserHeader back={false} />
    </Box>
  );
}
