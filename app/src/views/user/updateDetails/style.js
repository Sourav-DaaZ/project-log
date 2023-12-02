import styled from 'styled-components/native';
import { View, ScrollView, } from 'react-native';
import Button from '../../../sharedComponents/button'

export const SubmitButton = styled(Button)`
    width: 100%;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    margin-bottom: ${(props) => props.theme.spacing.height * 2}px
    margin-top: ${(props) => props.theme.spacing.height * 8}px
`;

export const InputView = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    margin-bottom: ${(props) => props.theme.spacing.height}px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
`;

export const BodyWrapper = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    padding: ${(props) => props.theme.spacing.height}px ${(props) => props.theme.spacing.width * 2}px;
    margin: ${(props) => props.theme.spacing.height}px ${(props) => props.theme.spacing.width * 3}px;
    padding: ${(props) => props.theme.spacing.height}px ${(props) => props.theme.spacing.width * 3}px;
    padding-top: ${(props) => props.theme.spacing.height * 3}px;
`;

export const StyledScrollView = styled(ScrollView)`
    width: 100%;
`;

export const StyledInput = styled(View)`
    flex: 1;
    flex-direction: column;
`
export const StyledInlineInputContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 999;
    margin-bottom: ${(props) => props.theme.spacing.height}px;
`

export const WrapperImage = styled(View)`
    flex: 1;
    margin: ${(props) => props.theme.spacing.height}px ${(props) => props.theme.spacing.width * 2}px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: -${(props) => props.theme.spacing.height * 6}px;
`

export const StyledViewButton = styled(View)`
    display: flex;
    flex-direction: row;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor}; 
`;