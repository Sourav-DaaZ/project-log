import React, { useContext } from 'react';
import * as Animatable from 'react-native-animatable';
import { ActivityIndicator } from 'react-native-paper';
import { ThemeContext } from 'styled-components';

const Loader = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const spacing = themeContext.spacing;
    const borderRedius = themeContext.borderRedius;
    return (
        props.loaderOnly ? <ActivityIndicator style={{
            padding: spacing.width * 5,
            borderRadius: borderRedius.round,
            backgroundColor: colors.mainByColor,
            width: spacing.width * 10,
            height: spacing.width * 10,
            ...props.style
        }} animating={true} color={colors.mainColor} /> : <Animatable.View animation='pulse' style={{
            backgroundColor: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            margin: spacing.width * 5
        }}>
            <ActivityIndicator style={{
                padding: spacing.width * 5,
                borderRadius: borderRedius.round,
                backgroundColor: colors.backgroundColor,
                width: spacing.width * 13,
                height: spacing.width * 13,
                shadowColor: colors.shadowColor,
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.6,
                shadowRadius: 3,
                elevation: 7,

            }} animating={true} color={colors.mainColor} />
        </Animatable.View>
    );
};

export default Loader;