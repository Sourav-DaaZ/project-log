import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import Button from '../../sharedComponents/button';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export const StyledCard = styled(Card)`
    margin-horizontal: ${(props) => props.theme.spacing.width * 6}px;
    margin-top: -${(props) => props.theme.spacing.height * 2}px;
    margin-bottom: ${(props) => props.theme.spacing.height * 2}px;
    border-radius: ${(props) => props.theme.borderRedius.small}px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledCardCover = styled(Card.Cover)`
    height: ${(props) => props.theme.spacing.height * 18}px; 
    width: ${(props) => (props.theme.spacing.width * 100 - (props.theme.spacing.width * 8))}px;
    margin-left: ${(props) => props.theme.spacing.width * 4}px;
    border-radius: ${(props) => props.theme.borderRedius.small}px;
`;

export const StyledCardContent = styled(Card.Content)`
    margin: ${(props) => props.theme.spacing.height}px ${(props) => props.theme.spacing.width}px;
    margin-top: 0px;
    border-radius: ${(props) => props.theme.borderRedius.small}px;
`;

export const StyledCardContentProfile = styled(View)`
    
`;

export const StyledRate = styled(View)`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: ${(props) => props.theme.spacing.width * 5}px;
    margin-bottom: ${(props) => props.theme.spacing.height}px;
    margin-top: 0px;
`;

export const StyledCardAction = styled(Card.Actions)`
    margin-left: ${(props) => props.theme.spacing.width * 2}px;
    margin-right: ${(props) => props.theme.spacing.width}px;
    margin-bottom: ${(props) => props.theme.spacing.height}px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const StyledCardTitle = styled(Title)`
    font-size: ${(props) => props.theme.fonts.medium}px;
    font-family: ${(props) => props.theme.fontWeight.semiBold};
    margin-top: ${(props) => props.theme.spacing.height}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep};
`;

export const StyledCardParagraph = styled(Paragraph)`
    font-size: ${(props) => props.theme.fonts.regular}px;
    margin-top: ${(props) => props.theme.spacing.height}px;
    margin-bottom: 0px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`;

export const StyledCardButton = styled(Button)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    width: 80%;
    padding: ${(props) => props.theme.spacing.height * .1}px ${(props) => props.theme.spacing.width * 10}px;
    margin-right: 4%;
`;

export const StyledView = styled(TouchableOpacity)`
    width: 16%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
`;

export const StyledFontAwesome = styled(FontAwesome)`
    font-size: ${(props) => props.theme.fonts.medium}px;
    margin-right: ${(props) => props.theme.spacing.width}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainByColor}
`;