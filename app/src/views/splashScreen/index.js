import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { ThemeContext } from 'styled-components';
import logoImg from '../../assets/images/logo.png';
import {
  SplashOuterView,
  SplashLogo,
} from './style';

const SplashScreen = (props) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];
  return (
    <SplashOuterView>
      <StatusBar backgroundColor={colors.mainColor} barStyle="light-content" />
      <SplashLogo
        source={logoImg}
      />
     
    </SplashOuterView>
  );
};

export default SplashScreen;