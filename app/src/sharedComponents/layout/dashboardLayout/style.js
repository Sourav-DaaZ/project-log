import styled from 'styled-components/native';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView, Image } from 'react-native';
import { View } from 'react-native-animatable';
import Button from '../../button';


export const DashboardOuterView = styled(SafeAreaView)`
    display: flex;
    flex: 1;
    flex-direction: column;
    z-index: 1;
`;

export const StyledFullImg = styled(Image)`
    width: 100%;
    height: ${(props) => props.theme.spacing.height * 20}px;
`;

export const StyledScrollView = styled(ScrollView)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
`;

export const LoginDescription = styled(Text)`
    font-size: ${(props) => props.theme.fonts.regular}px;
    font-family: ${(props) => props.theme.fontWeight.bold};
    text-align: center;
    margin-bottom: ${(props) => props.marginLarge ? props.theme.spacing.height * 8 : props.theme.spacing.height * 2}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`;

export const SplashTitle = styled(Text)`
    font-size: ${(props) => props.theme.fonts.large}px;
    font-family: ${(props) => props.theme.fontWeight.bold};
    text-align: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}
`;
