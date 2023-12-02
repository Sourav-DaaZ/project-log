import React, { useContext, useEffect } from 'react';
import {
    View,
    SafeAreaView
} from 'react-native';
import { ThemeContext } from 'styled-components';
import { StyledContainer, StyledView, StyledText } from './style';
import SnackBar from '../snackbar';
import { useDispatch } from 'react-redux';
import { navigationUpdate } from '../../store/actions';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { handleOnloadDynamicLink } from '../../services/google/deepLinkingHandler';


export const BottomShadow = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const spacing = themeContext.spacing;
    return (
        <View style={{ overflow: 'hidden', paddingBottom: props.small ? spacing.height * 2 : spacing.height * 4, backgroundColor: colors.backgroundDeepColor, marginBottom: props.small ? 0 : -(spacing.height * 2) }}>
            <View
                style={{
                    backgroundColor: colors.backgroundColor,
                    shadowColor: colors.shadowColor,
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 0.6,
                    shadowRadius: 3,
                    elevation: 10,
                }} >
                {props.children}
            </View>
        </View>
    );
};

export const ShadowWrapperContainer = (props) => {
    if (props.navigation) {
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(navigationUpdate(props.navigation.navigate));
            handleOnloadDynamicLink(undefined, props.navigation);
            dynamicLinks().onLink((link) => handleOnloadDynamicLink(link, props.navigation));
        }, [props.navigation])
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {!props.noSnack ? <SnackBar /> : null}
            {props.dataLength !== null && props.dataLength === 0 ? <StyledText>No Data Available!</StyledText> : null}
            {props.none ? <StyledView>
                {props.children}
            </StyledView> : <StyledContainer bgWhite={props.bgWhite} style={props.style} animation={props.animation ? props.animation : 'fadeIn'}>
                {props.children}
            </StyledContainer>}
        </SafeAreaView>
    );
};
