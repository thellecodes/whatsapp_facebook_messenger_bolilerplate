import React from 'react';
import {Image, ScrollView} from 'react-native';
import {Box, Text} from '../../theme';
import {Img1, Img2, Img3, Img4, Img5, Img6, status} from '../../../images';
import {useSelector} from 'react-redux';

const topSearchImage = [
  {src: Img1, notification: true},
  {src: Img2, notification: false},
  {src: Img3, notification: true},
  {src: Img4, notification: true},
  {src: Img5, notification: false},
  {src: Img6, notification: false},
];

function TopStatus() {
  return (
    <Box marginTop="s" padding="m">
      <Text
        marginBottom="m"
        fontSize={25}
        fontFamily="Rubik-Bold"
        fontWeight="600"
        color="primary">
        Status
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {topSearchImage.map(({src, notification}, index) => (
          <Box
            key={index}
            justifyContent="flex-end"
            alignItems={'center'}
            marginRight="s"
            position="relative">
            <Image source={src} />
            {notification ? (
              <Box style={{position: 'absolute', top: -18, right: -10}}>
                <Image source={status} />
              </Box>
            ) : null}
          </Box>
        ))}
      </ScrollView>
    </Box>
  );
}

export default TopStatus;
