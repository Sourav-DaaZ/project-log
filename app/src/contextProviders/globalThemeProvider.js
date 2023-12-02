import React from 'react';
import { ThemeProvider } from "styled-components";
import { defaultColor } from '../constants/colorCode';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

const theme = {
  baseColor: 'blue',
  colors: {
    ...defaultColor
  },
  fonts: {
    small: width * .035,
    regular: width * .045,
    medium: width * .05,
    large: width * .07,
    veryLarge: width * .1
  },
  fontFamily: {
    family: 'Oswald'
  },
  fontWeight: {
    light: 'Oswald-Light',
    semiBold: 'Oswald-Medium',
    bold: 'Oswald-SemiBold',
    trueBold: 'Oswald-Bold',
  },
  borderRedius: {
    small: 10,
    semi: 20,
    round: 40
  },
  spacing: {
    height: height * .01,
    width: width * .01,
  },
  animation: {
    scale: 1.0,
  },
};



const GlobalThemeProvider = (props) => {
  return (<ThemeProvider theme={theme}>{props.children}</ThemeProvider>)
};

export default GlobalThemeProvider; 