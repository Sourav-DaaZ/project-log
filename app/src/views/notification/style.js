import styled from 'styled-components/native';
import { ScrollView, Text } from 'react-native';
import Button from '../../sharedComponents/button';

export const StyledScrollView = styled(ScrollView)`
    margin: ${(props) => props.theme.spacing.height * 2}px ${(props) => props.theme.spacing.width * 3}px;
    margin-top: 0px;
`;

export const StyledButtonLoadMore = styled(Button)`
    width: 100%;
    margin-bottom: ${(props) => props.theme.spacing.height * 2}px;
`;

export const StyledTimeView = styled(Text)`
    width: 100%;
    text-align: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
    margin-top: ${(props) => props.theme.spacing.height}px
    margin-bottom: ${(props) => props.theme.spacing.height * 1.5}px;
    font-family: ${(props) => props.theme.fontWeight.light}; 
`;