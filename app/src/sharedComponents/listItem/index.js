import React from 'react';
import { View } from 'react-native';
import { truncate } from '../../utils';
import { StyledProfileView, StyledTitle, StyledParagraph, StyledParagraphBold, StyledRate } from './style';


export default ListItem = (props) => {
    return (
        <StyledProfileView style={props.topStyle} animation='zoomIn'>
            {props.image ? <View>
                {props.image}
            </View> : null}
            <View style={{ marginHorizontal: 10 }}>
                <StyledRate>
                    {props.title ? <StyledTitle img={props.image ? true : false}>{truncate(props.title, props.full ? -1 : 50)}</StyledTitle> : null}
                    {props?.inlineTitle}
                </StyledRate>
                {!props.descriptionBold && props.description ? <StyledParagraph img={props.image ? true : false}>{truncate(props.description, 60)}</StyledParagraph> : null}
                {props.descriptionBold ? <StyledParagraphBold img={props.image ? true : false}>{truncate(props.descriptionBold, 60)}</StyledParagraphBold> : null}
                {props.smallDescription ? <StyledParagraph img={props.image ? true : false}>{truncate(props.smallDescription, 40)}</StyledParagraph> : null}
            </View>
        </StyledProfileView>
    );
};
