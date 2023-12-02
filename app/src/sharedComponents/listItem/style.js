import styled from 'styled-components/native';
import { Paragraph, Title } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { View } from 'react-native';

export const StyledProfileView = styled(Animatable.View)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: ${(props) => props.theme.spacing.height}px ${(props) => props.theme.spacing.width * 2}px;
    border-bottom-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    margin-bottom: ${(props) => props.theme.spacing.height}px;
    border-radius: ${(props) => props.theme.borderRedius.small}px;
`;

export const StyledTitle = styled(Paragraph)`
    margin-bottom: 0px;
    font-family: ${(props) => props.theme.fontWeight.bold};
    line-height: ${(props) => props.theme.fonts.large}px;
    font-size: ${(props) => props.theme.fonts.medium}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}; 
    text-align: left;
`;

export const StyledSemiTitle = styled(Title)`
    line-height: ${(props) => props.theme.fonts.regular}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}; 
    font-family: ${(props) => props.theme.fontWeight.bold};
`;

export const StyledParagraph = styled(Paragraph)`
    line-height: ${(props) => props.theme.fonts.regular}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight}; 
    font-family: ${(props) => props.theme.fontWeight.light};
    margin-vertical: ${(props) => props.theme.spacing.height}px;
    margin-bottom: 0px;
    text-transform: capitalize;
`;

export const StyledParagraphBold = styled(Paragraph)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}; 
    font-family: ${(props) => props.theme.fontWeight.bold};
    line-height: ${(props) => props.theme.fonts.regular}px;
    margin-bottom: 0px;
    text-transform: capitalize;
`;

export const StyledRate = styled(View)`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 0px;
`;