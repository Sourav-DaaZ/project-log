import styled from 'styled-components/native';
import { ScrollView, View } from 'react-native';
import { Paragraph, Text, Title } from 'react-native-paper';


export const StyledProfileView = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${(props) => props.theme.spacing.height}px;
    padding: ${(props) => props.theme.spacing.height * 2}px;
`;

export const StyledProfile = styled(View)`
    padding-bottom: ${(props) => props.theme.spacing.height}px;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
`;

export const StyledTitle = styled(Title)`
    font-size: ${(props) => props.theme.fonts.large}px;
    font-family: ${(props) => props.theme.fontWeight.semiBold};
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}; 
`;

export const StyledSemiTitle = styled(Title)`
    font-size: ${(props) => props.theme.fonts.medium}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}; 
    letter-spacing: 1px;
    font-family: ${(props) => props.theme.fontWeight.semiBold};
    margin-bottom: 30px;
    margin-top: 10px;
`;

export const StyledParagraph = styled(Paragraph)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight}; 
    font-family: ${(props) => props.theme.fontWeight.light};
`;

export const StyledCenter = styled(View)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-vertical: ${(props) => props.theme.spacing.height}px;
`;

export const StyledLeftContainer = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-vertical: ${(props) => props.theme.spacing.height}px;
    margin-bottom: ${(props) => props.theme.spacing.height * .5}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight}; 
`;

export const WrapperContainer = styled(ScrollView)`
    display: flex;
`;