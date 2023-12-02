import React, { useContext, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Portal, Modal, Text } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { shallowEqual, useSelector } from 'react-redux';
import { ThemeContext } from 'styled-components';
import { StyledNotesView, StyledParagraph, StyledInputView, StyledInput, ButtonWrapper, UpdateButton, CancelText } from './style';

const ModalComponent = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const fonts = themeContext.fonts;
    const spacing = themeContext.spacing;
    const [showNotes, setShowNotes] = useState(false);
    const containerStyle = {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: -(spacing.height * 5),
        with: '100%',
        left: 0,
        right: 0,
        borderRadius: 30,
        paddingTop: (spacing.height * 5),
        zIndex: 999
    };

    return (
        <Portal>
            <Modal visible={props.show} onDismiss={props.onClose} contentContainerStyle={containerStyle}>
                {props.onClose ? <Entypo
                    name="cross"
                    size={spacing.width * 8}
                    style={{ position: 'absolute', right: (spacing.width * 5), top: (spacing.height * 2) }}
                    onPress={props.onClose}
                /> : null}
                <Text style={{ position: 'absolute', top: -(spacing.height * 5), left: (spacing.width * 5), color: colors.backgroundColor, fontSize: fonts.medium }}>{props.title}</Text>
                {props.children}

                {props.popupData ? <React.Fragment>
                    <TouchableOpacity onPress={() => setShowNotes(!showNotes)}>
                        <StyledParagraph style={{ textAlign: 'center', color: colors.mainByColor }}>{showNotes ? "Hide" : "Show"} Notes</StyledParagraph>
                    </TouchableOpacity>
                    <StyledNotesView>
                        {showNotes && props.notes?.map((y, i) => <StyledParagraph key={i} map={i}>{detailsStore.id === y.user ? 'Me' : 'User'}: {y.msg}</StyledParagraph>)}
                    </StyledNotesView>
                    <StyledInputView>
                        <View style={{ width: "85%" }}>
                            <StyledInput onFocus={() => props.setAddNotes('')} onInputChange={(val) => props.setAddNotes(val)} value={props.addNotes} styleView={{
                                borderBottomWidth: 0,
                                backgroundColor: colors.mainColor,
                            }} ele='input'
                                editable={props.editable}
                                onSubmit={props.onEdit}
                                placeholder='Please add a comment' />
                        </View>
                        {props.editable ? <TouchableOpacity style={{ width: '15%' }} onPress={props.onEdit}>
                            <Ionicons name='send' size={spacing.width * 10} style={{ color: colors.mainByColor, marginLeft: spacing.width * 2 }} />
                        </TouchableOpacity> : null}
                    </StyledInputView>
                </React.Fragment> : null}
                {props.btn ? <ButtonWrapper>
                    {props.btn[0]?.text ? <UpdateButton mode="outlined" full={props.btn[0]?.full} onPress={props.btn[0].onPress}>
                        <CancelText>{props.btn[0].text}</CancelText>
                    </UpdateButton> : null}
                    {props.btn[1]?.text ? <UpdateButton full={props.btn[1]?.full} labelStyle={{ color: colors.backgroundColor }} disabled={props.btn[0].desabled} mode="contained" onPress={props.btn[1].onPress}>
                        {props.btn[1].text}
                    </UpdateButton> : null}
                </ButtonWrapper> : null}
            </Modal>
        </Portal>
    );
};

export default ModalComponent;