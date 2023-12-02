import styled from 'styled-components/native';
import {Image, ImageBackground} from 'react-native';

export const StyledImageBackground = styled(ImageBackground)`
  width: ${props =>
    props.keys
      ? props.theme.spacing.width * 90
      : props.theme.spacing.width * 100}px;
  height: ${props =>
    props.keys
      ? props.theme.spacing.height * 50
      : props.theme.spacing.height * 18}px;
`;

export const StyledCardCover = styled(Image)`
  min-height: ${props =>
    props.keys
      ? props.theme.spacing.height * 50
      : props.theme.spacing.height * 18}px;
  width: ${props =>
    props.keys
      ? props.theme.spacing.width * 90
      : props.theme.spacing.width * 100}px;
  height: ${props =>
    props.keys
      ? props.theme.spacing.height * 50
      : props.theme.spacing.height * 18}px;
  resizemode: contain;
`;
