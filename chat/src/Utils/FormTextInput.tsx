import React, {forwardRef} from 'react';

import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps as RNTextInputProps,
  Dimensions,
} from 'react-native';

import theme, {Box} from '../components/theme';

const {width} = Dimensions.get('window');

interface TextInputProps extends RNTextInputProps {
  styles: any;
}

const FormTextInput = forwardRef<RNTextInput, TextInputProps>(
  ({styles, ...props}, ref) => {
    return (
      <Box
        flexDirection="row"
        borderRadius="s"
        borderColor="grey"
        borderWidth={StyleSheet.hairlineWidth}
        alignItems="center"
        style={{
          ...styles,
        }}>
        <RNTextInput
          underlineColorAndroid="transparent"
          placeholderTextColor={theme.colors.grey}
          {...props}
          {...{ref}}
          style={{
            flex: 1,
            fontFamily: 'Rubik-Medium',
            color: theme.colors.grey,
            fontSize: 15,
            textTransform: 'capitalize',
          }}
        />
      </Box>
    );
  },
);
export default FormTextInput;
