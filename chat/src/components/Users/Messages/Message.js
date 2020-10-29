import React, {Fragment} from 'react';
import theme, {Box, Text} from '../../theme';

import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import MessageHeader from './MessageHeader';
import {connect} from 'react-redux';

import {
  sendMsg,
  uniqueUserChat,
  getDispatchMsg,
  LoadRoomMsgs,
} from '../../../store/actions/chatAction';

import {ScrollView} from 'react-native-gesture-handler';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {Container, Footer, Header} from 'native-base';

const {width} = Dimensions.get('window');

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      txtMsg: '',
      activeRoomFound: false,
      activeRoom: '',
      myMsgs: [],
    };
    this.scrollView = React.createRef();
    this.routeParams = props.route.params;
  }

  onChange = (text) => this.setState({txtMsg: text});

  onSend = () => {
    const {txtMsg} = this.state;
    if (!txtMsg) return;
    const {email: reciever} = this.routeParams;
    this.props
      .sendMsg({txtMsg, reciever})
      .then(() => this.setState({txtMsg: ''}));
  };

  componentDidMount() {
    const {_id, email, name} = this.routeParams;
    new Promise((res) => {
      this.props.uniqueUserChat({_id, email, name});
      setTimeout(res, 2000);
    }).then(() => {
      this.props.LoadRoomMsgs();
    });
  }

  render() {
    const {email} = this.routeParams;

    return (
      <Container style={styles.container}>
        <Header style={styles.chatroomHeader}>
          <MessageHeader {...{email}} />
        </Header>

        <Box flex={1} paddingTop="s">
          {this.props.chat.activeRoomMsgs.length > 0 ? (
            <>
              <ScrollView
                ref={(ref) => (this.scrollView = ref)}
                onContentSizeChange={() =>
                  this.scrollView.scrollToEnd({animated: true})
                }
                showsVerticalScrollIndicator={false}
                onLayout={() => this.scrollView.scrollToEnd({animated: true})}>
                {this.props.chat.activeRoomMsgs.map(
                  ({txtMsg, sender}, index) => {
                    return (
                      <Fragment key={index}>
                        <RenderItem {...{txtMsg, sender}} />
                      </Fragment>
                    );
                  },
                )}
              </ScrollView>
            </>
          ) : (
            <Box justifyContent="center" alignItems="center" flex={1}>
              <Text>Start Chatting...</Text>
            </Box>
          )}
        </Box>

        <Footer style={styles.footer}>
          <Box
            flexDirection="row"
            height={54}
            borderRadius="s"
            alignItems="center"
            style={{
              paddingHorizontal: 4,
              width: width * 0.9,
              borderRadius: 16,
            }}>
            <TextInput
              defaultValue={this.state.txtMsg}
              placeholderTextColor="#2E2D2C"
              placeholder="Type something"
              underlineColorAndroid="transparent"
              placeholderTextColor={theme.colors.grey}
              style={{...styles.Input}}
              onChangeText={(txtMsg) => this.onChange(txtMsg)}
              onSubmitEditing={this.onSend}
            />

            <Box padding="s" backgroundColor="primary" borderRadius="m">
              <TouchableWithoutFeedback onPress={this.onSend}>
                <FeatherIcons name="send" size={25} color="white" />
              </TouchableWithoutFeedback>
            </Box>
          </Box>
        </Footer>
      </Container>
    );
  }
}

const RenderItem = ({txtMsg, sender}) => {
  return (
    <TouchableOpacity>
      <Box
        flexDirection="row"
        marginBottom="s"
        justifyContent={sender ? 'flex-end' : 'flex-start'}
        paddingHorizontal="m">
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
  },
  chatroomHeader: {
    backgroundColor: '#ffffff',
  },

  footer: {
    backgroundColor: 'transparent',
    display: 'flex',
    fontFamily: 'Rubik-Bold',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.m,
    height: 70,
  },
  Input: {
    fontSize: 16,
    color: '#2E2D2C',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    fontFamily: 'Rubik-Bold',
    color: theme.colors.grey,
    borderRadius: 50,
    marginRight: 20,
  },
});

const mapStateToProps = (state) => ({
  chat: state.chat,
});

export default connect(mapStateToProps, {
  sendMsg,
  uniqueUserChat,
  getDispatchMsg,
  LoadRoomMsgs,
})(Message);
