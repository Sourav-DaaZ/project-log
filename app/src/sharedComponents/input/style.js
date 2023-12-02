import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { View, TextInput, Text } from 'react-native';
import { Switch } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Searchbar } from 'react-native-paper';

export const StyledInputView = styled(View)`
    flex-direction: row;
    border-bottom-width: 1.5px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    border-bottomColor: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
    padding-bottom: ${(props) => Platform.OS === 'ios' ? props.theme.spacing.height : 0};
`;

export const StyledInputElement = styled(TextInput)`
    flex: 1;
    margin-top: ${(props) => Platform.OS === 'ios' ? 0 : - (props.theme.spacing.height * 1.5)}px;
    font-size: ${(props) => props.theme.fonts.regular}px;
    padding-left: ${(props) => props.icons && props.icons[0] ? props.theme.spacing.width * 2 : 0}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep};
    font-family: ${(props) => props.theme.fontWeight.light};
`;

export const StyledTitle = styled(Text)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
    font-family: ${(props) => props.theme.fontWeight.semiBold};
    font-size: ${(props) => props.theme.fonts.regular}px;
    margin-bottom: ${(props) => props.theme.spacing.height}px;
    margin-top: ${(props) => props.theme.spacing.height * 3}px;
`;

export const StyledError = styled(Text)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].errorColor};
    font-family: ${(props) => props.theme.fontWeight.light};
`;

export const StyledPicker = styled(DropDownPicker)`
    font-family: ${(props) => props.theme.fontWeight.light};
`;

export const StyledSwitch = styled(Switch)`
    
`;

export const StyledSearchbar = styled(Searchbar)`
    
`;