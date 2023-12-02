import React, { useContext } from 'react';
import { Button } from 'react-native-paper';
import { ThemeContext } from 'styled-components';

const ButtonComponent = (props) => {
    const themeContext = useContext(ThemeContext);
    const spacing = themeContext.spacing;
    const font = themeContext.fontWeight;
    return (
        <Button uppercased={false} {...props} labelStyle={[{ fontFamily: font.semiBold }, props.labelStyle]} contentStyle={[{ padding: spacing.height }, props.contentStyle]} style={[{ borderRadius: props.circular ? 30 : 5 }, props.style]}>
            {props.children}
        </Button>
    )
};

export default ButtonComponent;