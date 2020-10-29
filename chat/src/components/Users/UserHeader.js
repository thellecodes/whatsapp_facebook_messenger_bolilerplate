import React from 'react';
import {Dimensions} from 'react-native';
import {Back, Hamburger} from '../../Icons';
import Search from '../../Icons/Search';
import {Box} from '../theme';

const {height} = Dimensions.get('window');

function UserHeader({back}) {
  return (
    <Box
      flexDirection="row"
      padding="m"
      height={height * 0.06}
      justifyContent="space-between"
      alignItems="center">
      {back ? <Back size={27} /> : <Hamburger size={20} />}
      <Search size={27} />
    </Box>
  );
}

export default UserHeader;
