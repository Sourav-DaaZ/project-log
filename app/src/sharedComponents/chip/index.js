import React, { useContext } from 'react';
import { Chip, Text } from 'react-native-paper';
import { ThemeContext } from 'styled-components';

const ChipComponent = (props) => {
    const themeContext = useContext(ThemeContext);
    const spacing = themeContext.spacing;
    const font = themeContext.fontWeight;
    const color = themeContext.colors[themeContext.baseColor];
    return (
        <Chip uppercased={false} {...props} labelStyle={[{ fontFamily: font.regular }, props.labelStyle]} contentStyle={[{ padding: spacing.height }, props.contentStyle]} style={[{ borderRadius: props.circular ? 30 : 5, backgroundColor: props.selected ? color.mainColor : color.borderColor }, props.style]} selectedColor={color.backgroundColor}>
            <Text style={{ fontFamily: font.regular, color: props.selected ? color.backgroundColor : color.mainColor }}>
                {props.children}
            </Text>
        </Chip>
    )
};

export default ChipComponent;