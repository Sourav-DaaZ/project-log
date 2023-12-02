import React from 'react';
import { StyledWrapper, StyledFontAwesome } from './style';

const RatingComponent = (props) => {
    return (
        <StyledWrapper style={props.style}>
            <StyledFontAwesome name={props.rating === 1 ? 'star' : props.rating > 0 && props.rating < 1 ? 'star-half-o' : props.rating > 1 ? 'star' : 'star-o'} onPress={() => props.setRating(1)} />
            <StyledFontAwesome name={props.rating === 2 ? 'star' : props.rating > 1 && props.rating < 2 ? 'star-half-o' : props.rating > 2 ? 'star' : 'star-o'} onPress={() => props.setRating(2)} />
            <StyledFontAwesome name={props.rating === 3 ? 'star' : props.rating > 2 && props.rating < 3 ? 'star-half-o' : props.rating > 3 ? 'star' : 'star-o'} onPress={() => props.setRating(3)} />
            <StyledFontAwesome name={props.rating === 4 ? 'star' : props.rating > 3 && props.rating < 4 ? 'star-half-o' : props.rating > 4 ? 'star' : 'star-o'} onPress={() => props.setRating(4)} />
            <StyledFontAwesome name={props.rating >= 5 ? 'star' : 'star-o'} onPress={() => props.setRating(5)} />
        </StyledWrapper>
    )
};

export default RatingComponent;