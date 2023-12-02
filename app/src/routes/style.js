import styled from 'styled-components/native';
import { View, SafeAreaView, Image } from 'react-native';

export const StyledTabView = styled(View)`
    display: flex;
    flex-Direction: row;
    justify-content: space-around;
    align-items: center;
    padding: ${(props) => props.theme.spacing.height}px ${(props) => props.theme.spacing.width}px;
    border-top-width: 1px;
    border-top-color:  ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledHeaderView = styled(SafeAreaView)`
    display: flex;
    flex-Direction: row;
    justify-content: space-between;
    box-shadow: none;
    background-color: ${(props) => props.dark ? props.theme.colors[props.theme.baseColor].mainColor : props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledEachHeaderView = styled(View)`
    display: flex;
    flex-Direction: row;
    align-items: center;
    justify-content: center;
    padding: ${(props) => props.theme.spacing.height}px ${(props) => props.theme.spacing.width}px;
    margin-right: ${(props) => props.theme.spacing.width}px;
    margin-bottom: ${(props) => props.theme.spacing.height}px;
`;

export const StyledCercularBorder = styled(View)`
    padding: ${(props) => props.theme.spacing.width * 4}px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainByColor};
    border-radius: ${(props) => props.theme.borderRedius.round}px;
`;

export const StyledCercularByBorder = styled(View)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    border-radius: ${(props) => props.theme.borderRedius.round}px;
    padding: ${(props) => props.theme.spacing.width * 4}px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
`;

export const StyledOption = styled(View)`
    padding: ${(props) => props.theme.spacing.width * 4}px;
`;

export const StyledImage = styled(Image)`
    width: ${(props) => props.theme.spacing.width * 25}px;
    height: ${(props) => props.theme.spacing.height * 4}px;
    margin: ${(props) => props.theme.spacing.width * .3}px;
    resize-mode: contain
`;