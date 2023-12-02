import styled from 'styled-components/native';
import {View, Image, ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import Button from '../../sharedComponents/button';

export const SplashOuterView = styled(ScrollView)`
  padding: ${props => props.theme.spacing.height}px
    ${props => props.theme.spacing.width * 3}px;
  background-color: ${props =>
    props.theme.colors[props.theme.baseColor].backgroundDeepColor};
`;

export const SplashInnerView = styled(View)`
  display: flex;
  flex: 1;
  justify-content: center;
  align-content: center;
  height: 100%
`;

export const SplashLogo = styled(Image)`
  width: ${props => props.theme.spacing.width * 30}px;
  height: ${props => props.theme.spacing.height * 7}px;
  margin-bottom: ${props => props.theme.spacing.height * 2}px;
`;

export const SplashTitle = styled(Text)`
  font-size: ${props => props.theme.fonts.veryLarge}px;
  font-family: ${props => props.theme.fontWeight.bold};
  text-align: center;
  color: ${props => props.theme.colors[props.theme.baseColor].textDeep};
`;

export const SplashDescription = styled(Text)`
  font-size: ${props => props.theme.fonts.medium}px;
  font-family: ${props => props.theme.fontWeight.bold};
  text-align: center;
  line-height: ${props => props.theme.spacing.height * 4}px;
  margin-bottom: ${props => props.theme.spacing.height * 3}px;
  margin-top: ${props => props.theme.spacing.height}px;
  color: ${props => props.theme.colors[props.theme.baseColor].textLight};
`;

export const SplashButton = styled(Button)`
  margin-top: ${props => props.theme.spacing.height * 2}px;
  background-color: ${props =>
    props.theme.colors[props.theme.baseColor].mainColor};
`;

export const StyledBannerWrapper = styled(View)`
  margin-bottom: ${props => props.theme.spacing.height}px;
  margin-horizontal: ${props => props.theme.spacing.width * 2}px;
  width: ${props =>
    props.theme.spacing.width * 100 - props.theme.spacing.width * 6}px;
`;
