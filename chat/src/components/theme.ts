import {createText, createBox} from '@shopify/restyle';
import {moderateScale} from 'react-native-size-matters';
import {CUSTOMFONT} from './Helpers';

const theme = {
  colors: {
    white: '#ffffff',
    primary: '#1EAE54',
    grey: '#818181',
    sgrey: '#4a4a4a',
    bgrey: '#555555',
    cgrey: '#FAFAFA',
    dgrey: '#f9f9f9',
    text: '#252525',
    orange: '#FEBD69',
    black: '#000000',
    button: '#1EAE54',
    danger: '#F7622E',
    wblack: '#454F63'

  },
  spacing: {
    xs: moderateScale(5),
    s: moderateScale(8),
    m: moderateScale(16),
    l: moderateScale(24),
    xl: moderateScale(40),
  },
  borderRadii: {
    s: moderateScale(4),
    m: moderateScale(10),
    l: moderateScale(25),
    xl: moderateScale(75),
  },
  textVariants: {
    title: {
      fontSize: CUSTOMFONT(35),
      fontFamily: 'Rubik-Bold',
      color: 'white',
    },
    body: {
      fontSize: CUSTOMFONT(16),
      lineHeight: CUSTOMFONT(25),
      fontFamily: 'Rubik-Regular',
      color: 'text',
    },
    button: {
      fontSize: CUSTOMFONT(15),
      fontFamily: 'Rubik-Bold',
      color: 'text',
    },
    smtitle: {
      fontSize: CUSTOMFONT(16),
      fontFamily: 'Rubik-Medium',
      color: 'grey',
    },
  },
  breakpoints: {},
};

export type Theme = typeof theme;
export const Text = createText<Theme>();
export const Box = createBox<Theme>();
export default theme;
