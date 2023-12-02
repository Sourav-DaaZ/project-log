import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { ThemeContext } from 'styled-components';
import logoImg from '../../assets/images/logo.png';
import {
  SplashOuterView,
  SplashLogo,
  SplashTitle,
  SplashDescription,
  SplashButton
} from './style';

const AccessScreen = (props) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];
  return (
    <SplashOuterView>
      <StatusBar backgroundColor={colors.backgroundDeepColor} barStyle="dark-content" />
      <SplashLogo
        source={logoImg}
        resizeMode="contain"
      />
      <SplashTitle>{props.route.params.type} ERROR!</SplashTitle>
      <SplashDescription>Please give your {props.route.params.type} access for better performance.</SplashDescription>
      {props.route?.params?.err ? <SplashDescription>error: {props.route.params.err.toString()}</SplashDescription> : null}
      <SplashButton labelStyle={{ color: colors.backgroundColor }} mode='contained' circular onPress={() => props.navigation.goBack()}>
        Try Again
      </SplashButton>
    </SplashOuterView>
  );
};

export default AccessScreen;