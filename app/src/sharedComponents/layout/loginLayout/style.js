import { View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as Animatable from 'react-native-animatable';

export const LoginContainer = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor}
`;
export const StyledIonicons = styled(Ionicons)`
  color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor}
`;

export const LoginSafeView = styled(SafeAreaView)`
  flex: .4;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
  border-radius: 0px;
  border-bottom-left-radius: ${(props) => props.theme.borderRedius.semi}px;
  border-bottom-right-radius: ${(props) => props.theme.borderRedius.semi}px;
  position: relative;
`;

export const LoginLogo = styled(Image)`
  margin-top: -${(props) => props.theme.spacing.height * 7}px;
  width: ${(props) => props.theme.spacing.width * 30}px;
  height: ${(props) => props.theme.spacing.height * 50}px;
  resize-mode: contain;
`;

export const LoginBack = styled(TouchableOpacity)`
  position: absolute;
  left: ${(props) => props.theme.spacing.width * 3}px;
  margin-top: ${(props) => -props.theme.spacing.height * 6}px;
  top: 50%;
  color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const LoginNetworkLogo = styled(FontAwesome)`
  margin: ${(props) => props.theme.spacing.height}px ${(props) => props.theme.spacing.width * 8}px;
`;

export const LoginDevider = styled(Animatable.View)`
  flex-direction: row; 
  align-items: center;
  margin-left: ${(props) => props.theme.spacing.width * 6}px;
  margin-right: ${(props) => props.theme.spacing.width * 6}px;
`;

export const LoginDeviderLine = styled(Animatable.View)`
  flex: 1;
  height: 1px; 
  background-color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`;

export const LoginDeviderText = styled(Animatable.Text)`
  width: ${(props) => props.theme.spacing.width * 45}px; 
  text-align: center;
  color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
  font-family: ${(props) => props.theme.fontWeight.bold}
`;

export const LoginScrollView = styled(Animatable.View)`
  flex: .6;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme.borderRedius.semi}px;
  margin: ${(props) => props.theme.spacing.height * 2}px ${(props) => props.theme.spacing.width * 5}px;
  margin-top: -${(props) => props.theme.spacing.height * 7}px;
  background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor}
`;

export const LoginNetworkView = styled(Animatable.View)`
  padding: ${(props) => props.theme.spacing.height * 2}px ${(props) => props.theme.spacing.width}px;
  background-color: white;
  border-radius: ${(props) => props.theme.borderRedius.semi}px;
  margin: ${(props) => props.theme.spacing.height * 2}px ${(props) => props.theme.spacing.width * 5}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;