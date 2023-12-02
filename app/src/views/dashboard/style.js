import styled from 'styled-components/native';
import { ScrollView, View, Image } from 'react-native';
import { Headline } from 'react-native-paper';
import Chip from '../../sharedComponents/chip';


export const StyledHorizontalScrollView = styled(ScrollView)`
    
`;

export const StyledHeaderView = styled(View)`
    display: flex; 
    flex-direction: row; 
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${(props) => props.theme.spacing.height}px;
    padding-bottom: ${(props) => props.theme.spacing.height}px;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
`;

export const StyledHeaderHeadline = styled(Headline)`
    font-family: ${(props) => props.theme.fontWeight.bold}; 
    margin-vertical: ${(props) => props.theme.spacing.width}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep};
`;

export const StyledSearchbarView = styled(View)`
    padding-top: ${(props) => props.theme.spacing.height}px;
    margin-horizontal: ${(props) => props.theme.spacing.width * 3}px;
    margin-bottom: ${(props) => props.theme.spacing.height * 3}px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;
export const StyledBannerWrapper = styled(View)`
    margin-bottom: ${(props) => props.theme.spacing.height}px;
    margin-horizontal: ${(props) => props.theme.spacing.width * 3}px;
    width: ${(props) => props.theme.spacing.width * 100 - props.theme.spacing.width * 6}px;
    overflow: hidden;
    display: flex;
    flex: 1;
`;

export const StyledScrollView = styled(ScrollView)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
`;

export const StyledChip = styled(Chip)`
    margin-right: ${(props) => props.theme.spacing.width * 3}px;
    padding: ${(props) => props.theme.spacing.width * .3}px;
`;

export const StyledImage = styled(Image)`
    width: ${(props) => props.theme.spacing.width * 35}px;
    height: ${(props) => props.theme.spacing.height * 6}px;
    margin-horizontal: ${(props) => props.theme.spacing.width * .3}px;
    resize-mode: contain
`;