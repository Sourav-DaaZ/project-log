import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyledHeaderView, StyledHeaderHeadline } from './style';

const DashboardHeader = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <StyledHeaderView style={props.style}>
                <StyledHeaderHeadline>{props.text}</StyledHeaderHeadline>{props.goNext}
            </StyledHeaderView>
        </TouchableOpacity>
    )
};

export default DashboardHeader;