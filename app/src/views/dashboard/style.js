import styled from 'styled-components/native';
import { ScrollView, View, Image } from 'react-native';
import { Button, Headline, Paragraph, Text, Title } from 'react-native-paper';
import Chip from '../../sharedComponents/chip';


export const StyledHorizontalScrollView = styled(ScrollView)`
    
`;
export const StyledProfileView = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: ${(props) => props.theme.spacing.width}px;
`;

export const InputView = styled(ScrollView)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 20px;
    margin-bottom: ${(props) => props.theme.spacing.height * 2}px;
    min-height: ${(props) => props.theme.spacing.height * 3}px;
    width: 100%;
    max-height: ${(props) => props.theme.spacing.height * 80}px;
`;

export const StyledTitle = styled(Text)`
    font-size: ${(props) => props.xl?props.theme.fonts.veryLarge * 1.4: props.l?props.theme.fonts.medium * 1.3: props.theme.fonts.medium}px;
    font-family: ${(props) => props.theme.fontWeight.semiBold};
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}; 
    text-align: center
`;

export const StyledButton = styled(Button)`
    width: 100%;
    margin-bottom: ${(props) => props.theme.spacing.height * 1.5}px;
    padding: 5px;
`;

export const StyledParagraph = styled(Paragraph)`
    font-size: ${(props) => props.theme.fonts.small * 1.3}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight}; 
    font-family: ${(props) => props.theme.fontWeight.light};
`;
export const StyledHeaderView = styled(View)`
    display: flex; 
    flex-direction: row; 
    justify-content: space-between;
    align-items: center;
    padding-bottom: ${(props) => props.theme.spacing.height}px;
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
    max-height: ${(props) => props.theme.spacing.height * 9}px;
`;

export const StyledImage = styled(Image)`
    width: ${(props) => props.theme.spacing.width * 35}px;
    height: ${(props) => props.theme.spacing.height * 6}px;
    margin-horizontal: ${(props) => props.theme.spacing.width * .3}px;
    resize-mode: contain
`;