import styled from 'styled-components/native';
import { View, ScrollView } from 'react-native';
import { Paragraph, Title, Text } from 'react-native-paper';
import Button from '../../../sharedComponents/button';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';


export const StyledScrollView = styled(ScrollView)`
    flex: 1; 
    margin-bottom: ${(props) => props.theme.spacing.height}px;
`;

export const StyledProfileView = styled(View)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-top: ${(props) => props.theme.spacing.height * 7}px;
    padding-bottom: ${(props) => props.theme.spacing.height}px;
    border-bottom-width: 1px;
    border-radius: 10px;
    padding-left: ${(props) => props.theme.spacing.height * 2}px;
    border-bottom-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledImage = styled(View)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
    margin-top: ${(props) => props.theme.spacing.height * 3}px;
    padding-left: ${(props) => props.theme.spacing.height * 2}px;
`;

export const StyledReviewProfile = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: ${(props) => props.theme.spacing.height}px ${(props) => props.theme.spacing.width * 5}px;
    margin-top: 0px;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
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
`;


export const StyledParagraph = styled(Paragraph)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight}; 
    font-size: ${(props) => props.theme.fonts.regular}px;
    margin-bottom: ${(props) => props.theme.spacing.height}px;
    font-family: ${(props) => props.theme.fontWeight.light};
    textTransform: capitalize;
`;

export const StyledCenter = styled(View)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-vertical: ${(props) => props.theme.spacing.height}px;
`;

export const ImageWrapper = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: ${(props) => props.theme.spacing.height * 5}px;
    z-index: 9;
    margin-top: ${(props) => props.theme.spacing.height * 5}px;
`;

export const StyledHorizontalScrollView = styled(View)`
    background: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
`;

export const StyledViewButton = styled(View)`
    display: flex;
    flex-direction: row;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor}; 
`;
export const StyledStatus = styled(View)`
    flex-direction: column;
`;

export const CardWrapper = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const StyledPopupWrapper = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor}; 
    margin-top: 0px;
    margin-horizontal: ${(props) => props.theme.spacing.height * 3}px;
`;

export const StyledButtonView = styled(Text)`
    width: 100%;
    text-align: center;
    color: ${(props) => props.invert ? props.theme.colors[props.theme.baseColor].backgroundColor : props.theme.colors[props.theme.baseColor].mainByColor}; 
    fontWeight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.fonts.large}px;
    text-transform: uppercase;
`;

export const StyledDotIcon = styled(Entypo)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    font-size: ${(props) => props.theme.fonts.large}px;
    margin-right: ${(props) => props.theme.spacing.width * 5}px;
`;

export const StyledButtonLoadMore = styled(Button)`
    width: 100%;
    margin-bottom: ${(props) => props.theme.spacing.height}px;
`;

export const StyledFontAwesome = styled(FontAwesome)`
    font-size: ${(props) => props.theme.fonts.medium}px;
    margin-right: ${(props) => props.theme.spacing.width}px;
    margin-top: -${(props) => props.theme.spacing.height}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainByColor}
`;

export const StyledRate = styled(View)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 0px;
    margin-bottom: ${(props) => props.theme.spacing.height}px;
`;

export const StyledMaterialIcons = styled(MaterialIcons)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainByColor};
    font-size: ${(props) => props.theme.fonts.large}px;
    margin-horizontal: ${(props) => props.theme.spacing.width}px;
`;

export const StyledLogo = styled(MaterialIcons)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    font-size: ${(props) => props.theme.fonts.large}px;
    margin-right: ${(props) => props.theme.spacing.width}px;
    margin-top: -${(props) => props.theme.spacing.height}px;
`;

export const StyledEditIcon = styled(AntDesign)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    font-size: ${(props) => props.theme.fonts.medium}px;
    margin-left: ${(props) => props.theme.spacing.width * 5}px;
`;