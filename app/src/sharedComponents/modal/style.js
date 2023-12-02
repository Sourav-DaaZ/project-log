import styled from 'styled-components/native';
import { View, ScrollView, Text } from 'react-native';
import { Paragraph } from 'react-native-paper';
import Input from '../../sharedComponents/input';
import Button from '../button';



export const StyledParagraph = styled(Paragraph)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight}; 
    margin-bottom: ${(props) => props.theme.spacing.height}px;
    font-family: ${(props) => props.theme.fontWeight.light};
`;

export const StyledNotesView = styled(ScrollView)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor}; 
    margin-vertical: ${(props) => props.theme.spacing.width * 5}px;
    max-height: ${(props) => props.theme.spacing.height * 50}px;
    margin-horizontal: ${(props) => props.theme.spacing.height * 3}px;
`;

export const StyledInputView = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    padding: ${(props) => props.theme.spacing.height * 2}px ${(props) => props.theme.spacing.width * 5}px;
    padding-top: ${(props) => props.theme.spacing.height}px;
    padding-bottom: ${(props) => props.theme.spacing.height * 5}px;
    box-shadow: 0px -5px 5px #00000020;
    display: flex;
    border-top-left-radius: ${(props) => props.theme.borderRedius.semi}px;
    border-top-right-radius: ${(props) => props.theme.borderRedius.semi}px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const StyledInput = styled(Input)`
    padding-horizontal: ${(props) => props.theme.spacing.width * 5}px;
    padding-left: ${(props) => props.theme.spacing.width * 5}px;
    margin-top: -${(props) => props.theme.spacing.height * 4}px;
    border-radius: ${(props) => props.theme.borderRedius.semi}px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;


export const ButtonWrapper = styled(View)`
    display: flex;
    flex-Direction: row;
    flex: 1;
    margin-horizontal: ${(props) => props.theme.spacing.width * 3}px;
    justify-content: space-between;
`;

export const UpdateButton = styled(Button)`
    width: ${(props) => props.full ? '100%' : '48%'};
    background-color: ${(props) => props.mode !== 'outlined' ? props.theme.colors[props.theme.baseColor].mainColor : props.theme.colors[props.theme.baseColor].backgroundColor};
    border-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    border-width: 1px;
    margin-top: ${(props) => props.theme.spacing.height}px;
    margin-bottom: ${(props) => props.theme.spacing.height * 8}px;
`;

export const CancelText = styled(Text)`
    font-size: ${(props) => props.theme.fonts.regular}px;
    font-family: ${(props) => props.theme.fontWeight.bold};
    text-align: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
`;