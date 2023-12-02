import styled from 'styled-components/native';
import {View, TouchableOpacity, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const StyledContainer = styled(View)`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const StyledTextContainer = styled(View)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledText = styled(Text)`
  padding: 20px;
  font-size: ${props => props.theme.fonts.medium}px;
  color: ${props => props.theme.colors[props.theme.baseColor].textDeep};
  letter-spacing: 1px;
  text-align: center;
  font-family: ${props => props.theme.fontWeight.semiBold};
`;

export const StyledButton = styled(Ionicons)`
  color: ${props => props.theme.colors[props.theme.baseColor].mainByColor};
  font-size: ${props => props.theme.spacing.width * 15}px;
  margin-right: 2%;
  position: absolute;
  bottom: ${props =>
    props.theme.spacing.height * 4 + props.theme.spacing.width * 2}px;
  left: 48%;
`;
export const StyledReverse = styled(Ionicons)`
  color: ${props => props.theme.colors[props.theme.baseColor].mainByColor};
  font-size: ${props => props.theme.spacing.width * 10}px;
  margin-right: 2%;
  position: absolute;
  bottom: ${props =>
    props.theme.spacing.height * 4 + props.theme.spacing.width * 4}px;
  left: ${props => props.theme.spacing.width * 10}px;
`;
