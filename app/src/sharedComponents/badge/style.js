import styled from 'styled-components/native';
import { Badge } from 'react-native-paper';

export const StyledBadge = styled(Badge)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].errorColor};
    top: 0;
    position: absolute
`;