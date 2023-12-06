import React, { useContext, useState } from 'react';
import {
    StyledCard,
    StyledCardContent,
    StyledCardAction,
    StyledCardTitle,
    StyledCardParagraph,
    StyledCardCover,
    StyledCardButton,
    StyledView,
    StyledCardContentProfile,
    StyledFontAwesome,
    StyledRate
} from './style';
import { ThemeContext } from 'styled-components';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native';
import ImagePreview from '../imagePreview';
import { truncate } from '../../utils'

const CardComponent = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const spacing = themeContext.spacing;
    const [show, setShow] = useState(false);
    
    return (
        <Animatable.View animation='bounceIn'>
            {props.images && <TouchableOpacity onPress={() => setShow(true)}><StyledCardCover source={props.images && props.images !== '' && { uri: props.images } } /></TouchableOpacity>}
            <StyledCard style={{ marginTop: !props.images ? spacing.height : -spacing.height }}>
                {props.profile ? <StyledCardContentProfile>
                    {props.profile}
                </StyledCardContentProfile> : null}
                {props.review ? <StyledRate>
                    <StyledFontAwesome name='star' />
                    <StyledCardParagraph>{props.review}</StyledCardParagraph>
                </StyledRate> : null}
                <StyledCardContent>
                    {props.title ? <StyledCardTitle>{truncate(props?.title ? props.title : '')}</StyledCardTitle> : null}
                    {props.message ? <StyledCardParagraph>{truncate(props?.message ? props.message : '')}</StyledCardParagraph> : null}
                    {props.extraContent}
                </StyledCardContent>
                <StyledCardAction>
                    {props.onViewPress ? <StyledCardButton labelStyle={{ color: colors.backgroundColor }} mode='contained' contentStyle={{ padding: spacing.width }} onPress={props.onViewPress}>View</StyledCardButton> : null}
                    {props.onIconPress ? <StyledView onPress={props.onIconPress}>{props.icon}</StyledView> : null}
                    {props.actionItem}
                </StyledCardAction>
            </StyledCard>
            <ImagePreview show={show} images={[{ url: props.images }]} setShowFalse={() => setShow(false)} />
        </Animatable.View>
    )
};

export default CardComponent;