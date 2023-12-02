import styled from 'styled-components/native';
import { View, Image } from 'react-native';

export const SplashOuterView = styled(View)`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    height: 100%
`;

export const SplashLogo = styled(Image)`
    width: ${(props) => props.theme.spacing.width * 30}px;
`;
