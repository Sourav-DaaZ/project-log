import styled from 'styled-components/native';
import { View, Image } from 'react-native';
import { Text } from 'react-native-paper';
import Button from '../../sharedComponents/button'

export const SplashOuterView = styled(View)`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: ${(props) => props.theme.spacing.height * 3}px ${(props) => props.theme.spacing.width * 5}px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
    height: 100%
`;

export const SplashLogo = styled(Image)`
    width: ${(props) => props.theme.spacing.width * 30}px;
    height: ${(props) => props.theme.spacing.height * 7}px;
    margin-bottom: ${(props) => props.theme.spacing.height * 8}px;
`;

export const SplashTitle = styled(Text)`
    font-size: ${(props) => props.theme.fonts.veryLarge}px;
    font-family: ${(props) => props.theme.fontWeight.bold};
    text-align: center;
    margin-top: ${(props) => props.theme.spacing.height * 2}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}
`;

export const SplashDescription = styled(Text)`
    font-size: ${(props) => props.theme.fonts.medium}px;
    font-family: ${(props) => props.theme.fontWeight.bold};
    text-align: center;
    line-height: ${(props) => props.theme.spacing.height * 4}px;
    margin-bottom: ${(props) => props.theme.spacing.height * 10}px;
    margin-top: ${(props) => props.theme.spacing.height * 3}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`;

export const SplashButton = styled(Button)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
`;
