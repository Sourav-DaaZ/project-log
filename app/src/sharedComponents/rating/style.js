import styled from 'styled-components/native';
import { View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const StyledWrapper = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-vertical: ${(props) => props.theme.spacing.height * 2}px;
`;

export const StyledFontAwesome = styled(FontAwesome)`
    font-size: ${(props) => props.theme.fonts.veryLarge}px;
    margin-right: ${(props) => props.theme.spacing.width * 5}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainByColor}
`;
