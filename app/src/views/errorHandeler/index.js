import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { ThemeContext } from 'styled-components';
import logoImg from '../../assets/images/logo.png';
import errorFnc from './errorFunc';
import {
  SplashOuterView,
  SplashLogo,
  SplashTitle,
  SplashDescription,
  SplashButton
} from './style';

const ErrorHandeler = (props) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];

  const reportError = () => {
    errorFnc(props.error);
    props.resetError();

  }

  return (
    <SplashOuterView>
      <StatusBar backgroundColor={colors.backgroundDeepColor} barStyle="dark-content" />
      <SplashLogo
        source={logoImg}
      />
      <SplashTitle>Something Went Wrong!</SplashTitle>
      <SplashDescription>Error: {props.error.toString()}</SplashDescription>
      <SplashButton labelStyle={{ color: colors.backgroundColor }} mode='contained' circular onPress={reportError}>
        Try Again
      </SplashButton>
    </SplashOuterView>
  );
};

export default ErrorHandeler;