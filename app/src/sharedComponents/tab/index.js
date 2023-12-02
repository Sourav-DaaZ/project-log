import React from 'react';
import {
    StyledButtonView,
    StyledButtonActive,
    StyledTouchableOpacity,
} from './style';

const Tabs = ({ select, text, onPress }) => (
    select ? <StyledButtonActive onPress={onPress}><StyledButtonView invert>{text}</StyledButtonView></StyledButtonActive> : <StyledTouchableOpacity onPress={onPress}><StyledButtonView>{text}</StyledButtonView></StyledTouchableOpacity>
);

export default Tabs;