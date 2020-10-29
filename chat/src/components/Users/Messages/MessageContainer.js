import React, {Fragment, useRef, useEffect, useState} from 'react';
import {Dimensions, FlatList, TouchableOpacity, Image} from 'react-native';
import {withTimingTransition} from 'react-native-redash';
import theme, {Box, Text} from '../../theme';
import Animated, {interpolate} from 'react-native-reanimated';
import {Spinner} from 'native-base';
import {useSelector} from 'react-redux';

const {height} = Dimensions.get('window');

function UserTexts({_id, txtMsg, sender}) {
  return (
    <Box
      flexDirection="row"
      marginBottom="s"
      justifyContent={sender ? 'flex-end' : 'flex-start'}>
      <Box
        marginBottom="xs"
        paddingVertical="s"
        paddingHorizontal="m"
        justifyContent="center"
        position="relative"
        backgroundColor={sender ? 'primary' : 'white'}
        borderRadius="m"
        maxWidth={237}
        alignItems="center">
        <Text
          fontSize={12}
          variant="body"
          numberOfLines={3}
          lineHeight={25}
          color={sender ? 'white' : 'black'}>
          {txtMsg}
        </Text>
      </Box>
    </Box>
  );
}

function MessageContainer({keyBoardHeight, keyBoardValue}) {
  const [loading, setLoading] = useState(true);
  const KeyBoardAnimation = withTimingTransition(keyBoardHeight);

  const translateY = interpolate(KeyBoardAnimation, {
    inputRange: [0, keyBoardValue],
    outputRange: [0, -keyBoardValue],
  });

  const scrollRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const {activeRoom, messages, activeUser} = useSelector((state) => state.chat);

  const allmsgs = messages
    .filter(({roomID}) => roomID === activeRoom)
    .map(({_id, msg, sender: dipatcher}) => {
      return {
        _id,
        txtMsg: msg,
        sender: dipatcher === activeUser,
      };
    });

  return (
    <Animated.View
      style={{
        height: height * 0.76,
        paddingVertical: theme.spacing.m,
        paddingHorizontal: theme.spacing.m,
        zIndex: -1,
        transform: [{translateY}],
      }}>
      {loading ? (
        <Box justifyContent="center" alignItems="center" flex={1}>
          <Spinner color={theme.colors.primary} />
        </Box>
      ) : (
        <>
          {!loading && allmsgs.length > 0 ? (
            <FlatList
              ref={scrollRef}
              contentContainerStyle={{
                justifyContent: 'center',
                flexDirection: 'column',
              }}
              showsVerticalScrollIndicator={false}
              data={allmsgs}
              numColumns={1}
              renderItem={({item: {_id, txtMsg, sender}}) => {
                return (
                  <Fragment>
                    <TouchableOpacity>
                      <UserTexts {...{_id, txtMsg, sender}} />
                    </TouchableOpacity>
                  </Fragment>
                );
              }}
              keyExtractor={({_id}) => _id.toString()}
              initialScrollIndex={allmsgs.length - 1}
            />
          ) : (
            <Box flex={1} justifyContent="center" alignItems="center">
              <Text>Start Chatting..</Text>
            </Box>
          )}
        </>
      )}
    </Animated.View>
  );
}

export default MessageContainer;
