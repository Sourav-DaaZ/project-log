import React, { useContext } from 'react';
import {
    StyledBadge,
} from './style';
import { ThemeContext } from 'styled-components';
import { View } from 'react-native';

const BadgeComponent = (props) => {
    const themeContext = useContext(ThemeContext);
    const spacing = themeContext.spacing;

    return (
        <View>
            {props.children}
            {props.show ? <StyledBadge size={spacing.width * 3.5}>{props.count}</StyledBadge> : null}
        </View>
    )
};

export default BadgeComponent;