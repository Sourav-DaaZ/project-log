import styled from 'styled-components/native';
import { SafeAreaView, ScrollView, View, Text, Image } from 'react-native';
import { Card } from 'react-native-paper';
import Input from '../../../sharedComponents/input';
import Button from '../../../sharedComponents/button';


export const StyledCard = styled(Card)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledSafeAreaView = styled(SafeAreaView)`
    flex: 1
`;

export const StyledScrollView = styled(ScrollView)`
    height: 100%;
    padding-horizontal: ${(props) => props.theme.spacing.width * 8}px;
    margin-bottom: ${(props) => props.theme.spacing.height}px;
`;

export const WrapperView = styled(View)`
    margin-bottom: ${(props) => props.theme.spacing.height}px;
    // background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
`;

export const StyledInputView = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    padding-horizontal: ${(props) => props.theme.spacing.width * 8}px;
    box-shadow: 0px -5px 5px #00000020;
    display: flex;
    border-top-left-radius: ${(props) => props.theme.borderRedius.semi}px;
    border-top-right-radius: ${(props) => props.theme.borderRedius.semi}px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

export const StyledInput = styled(Input)`
    padding-horizontal: ${(props) => props.theme.spacing.width * 5}px;
    padding-left: ${(props) => props.theme.spacing.width * 5}px;
    margin-top: -${(props) => props.theme.spacing.height * 3}px;
    border-radius: ${(props) => props.theme.borderRedius.semi}px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledUserChatView = styled(View)`
    padding: ${(props) => props.theme.spacing.width * 5}px;
    border-radius: ${(props) => props.theme.borderRedius.semi}px;
    margin-vertical: ${(props) => props.theme.spacing.height * 2}px;
    max-width: 70%;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    align-self: flex-start
`;

export const StyledMyChatView = styled(View)`
    padding: ${(props) => props.theme.spacing.width * 5}px;
    border-radius: ${(props) => props.theme.borderRedius.semi}px;
    text-align: right;
    margin-vertical: ${(props) => props.theme.spacing.height * 2}px;
    max-width: 70%;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
    align-self: flex-end;
`;

export const StyledTimeView = styled(Text)`
    width: 100%;
    text-align: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
    font-family: ${(props) => props.theme.fontWeight.light}; 
`;

export const HeaderText = styled(Text)`
    font-family: ${(props) => props.theme.fontWeight.semiBold};
    font-size: ${(props) => props.theme.fonts.medium}px;
    margin-top: ${(props) => props.theme.spacing.height}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep};
`;

export const StyledUserChatViewText = styled(Text)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    font-size: ${(props) => props.theme.fonts.regular}px;
    font-family: ${(props) => props.theme.fontWeight.semiBold};
`;

export const StyledMyChatViewText = styled(Text)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    font-size: ${(props) => props.theme.fonts.regular}px;
    font-family: ${(props) => props.theme.fontWeight.semiBold};
`;
export const StyledClock = styled(Text)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
    position: absolute;
    bottom: -${(props) => props.theme.spacing.width * 5 + props.theme.spacing.width * 2}px;
    padding: ${(props) => props.theme.spacing.width * 2}px;
    font-family: ${(props) => props.theme.fontWeight.light};
`;

export const StyledButtonLoadMore = styled(Button)`
    width: 100%;
`;

export const StyledSmallImage = styled(Image)`
    width: ${(props) => props.theme.spacing.width * 30}px;
    height: ${(props) => props.theme.spacing.width * 30}px;
    margin-top: ${(props) => props.theme.spacing.width * 5}px;
    margin-bottom: -${(props) => props.theme.spacing.width * 3}px;
`;
export const StyledImage = styled(Image)`
    width: ${(props) => props.theme.spacing.width * 35}px;
    height: ${(props) => props.theme.spacing.width * 35}px;
    margin-top: ${(props) => props.theme.spacing.width * 5}px;
    margin-bottom: ${(props) => props.theme.spacing.width * 3}px;
`;

export const StyledRemove = styled(Button)`
    margin-top: ${(props) => props.theme.spacing.width * 5}px;
    margin-bottom: -${(props) => props.theme.spacing.width * 3}px;
`;
