import styled from 'styled-components/native';
import { View, ScrollView, ImageBackground, Image, Text } from 'react-native';
import Button from '../../../sharedComponents/button';

export const SubmitButton = styled(Button)`
    width: 100%;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    margin-bottom: ${(props) => props.theme.spacing.height * 2}px
`;

export const InputView = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    margin-bottom: ${(props) => props.theme.spacing.height}px;
    justify-content: center;
    width: 100%;
`;

export const BodyWrapper = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    padding: ${(props) => props.theme.spacing.height}px ${(props) => props.theme.spacing.width * 2}px;
    margin: ${(props) => props.theme.spacing.height}px ${(props) => props.theme.spacing.width * 2}px;
`;

export const StyledScrollView = styled(ScrollView)`
    
`;

export const StyledImageBackground = styled(ImageBackground)`
    margin-bottom: ${(props) => props.theme.spacing.height * 2}px;
`;

export const StyledCardCover = styled(Image)`
    height: ${(props) => props.theme.spacing.height * 30}px; 
    width: 100%;
    resizeMode: contain;
`;

export const StyledTitle = styled(Text)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
    font-family: ${(props) => props.theme.fontWeight.semiBold};
    font-size: ${(props) => props.theme.fonts.regular}px;
    margin-bottom: ${(props) => props.theme.spacing.height * 2}px;
`;