import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';


export const StyledButtonView = styled(Text)`
    width: 100%;
    text-align: center;
    color: ${(props) => props.invert ? props.theme.colors[props.theme.baseColor].backgroundColor : props.theme.colors[props.theme.baseColor].mainByColor}; 
    font-family: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.fonts.regular}px;
    text-transform: capitalize;
`;

export const StyledTouchableOpacity = styled(TouchableOpacity)`
    width: 50%;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;
export const StyledButtonActive = styled(TouchableOpacity)`
    width: 50%;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainByColor}; 
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: ${(props) => props.theme.spacing.height * 7}px;
    font-family: ${(props) => props.theme.fontWeight.bold};
`;