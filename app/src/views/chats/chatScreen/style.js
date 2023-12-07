import styled from 'styled-components/native';
import { View, ScrollView } from 'react-native';
import { Chip, Title } from 'react-native-paper';
import Button from '../../../sharedComponents/button';


export const StyledScrollView = styled(ScrollView)`
    margin: ${(props) => props.theme.spacing.height * 2}px ${(props) => props.theme.spacing.width * 3}px;
    margin-top: 0px;
`;
export const StyledTitle = styled(Title)`
    font-size: ${(props) => props.s? props.theme.fonts.medium : props.theme.fonts.large}px;
    font-family: ${(props) => props.theme.fontWeight.semiBold};
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}; 
    margin: ${(props) => props.theme.fonts.medium * .7}px;
    padding-top: ${(props) => props.theme.fonts.medium * .5}px;
`;
export const StyledList = styled(View)`
    margin-bottom: ${(props) => props.theme.spacing.height}px;
`;

export const StyledChip = styled(Chip)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
    margin-left: ${(props) => props.theme.spacing.width * 2}px;
    margin-bottom: ${(props) => props.theme.spacing.height}px;
`;

export const StyledButtonLoadMore = styled(Button)`
    width: 100%;
    margin-bottom: ${(props) => props.theme.spacing.height * 2}px;
`;
