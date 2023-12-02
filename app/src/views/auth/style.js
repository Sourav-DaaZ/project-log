import styled from 'styled-components/native';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import Button from '../../sharedComponents/button'


export const LoginOuterView = styled(ScrollView)`
    flex: 1;
    flex-direction: column;
    padding-horizontal: ${(props) => props.theme.spacing.width * 5}px;
    border-radius: ${(props) => props.theme.borderRedius.semi}px;
    width: 100%;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;


export const LoginSubmitButton = styled(Button)`
    width: 100%;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    margin-bottom: ${(props) => props.theme.spacing.height * 2}px
`;


export const StyledViewButton = styled(View)`
    display: flex;
    flex-direction: row;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor}; 
`;

export const StyledForgot = styled(View)`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;                                                                             
    margin-top: ${(props) => props.theme.spacing.height * 2}px;
`;

export const LoginDescription = styled(Text)`
    font-size: ${(props) => props.theme.fonts.regular}px;
    font-family: ${(props) => props.theme.fontWeight.bold};
    text-align: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`;

export const LoginLightDescription = styled(Text)`
    font-size: ${(props) => props.theme.fonts.regular}px;
    font-family: ${(props) => props.theme.fontWeight.light};
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`;

export const SplashButton = styled(Button)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
`;

export const LoginButton = styled(Button)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
`;

export const InputView = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    margin-bottom: ${(props) => props.theme.spacing.height * 2}px;
    min-height: ${(props) => props.theme.spacing.height * 3}px;
    justify-content: center;
    width: 100%;
`;

export const StyledInputOtp = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    margin-bottom: ${(props) => props.theme.spacing.height * 2}px;
    width: 100%;
    padding: ${(props) => props.theme.spacing.height * 4}px ${(props) => props.theme.spacing.width * 5}px;
    padding-top: 0px;
`;

export const SplashTitle = styled(Text)`
    font-size: ${(props) => props.theme.fonts.veryLarge}px;
    font-family: ${(props) => props.theme.fontWeight.bold};
    text-align: center;
    margin-top: 20px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}
`;