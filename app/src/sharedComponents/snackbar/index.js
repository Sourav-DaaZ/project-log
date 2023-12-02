import React, { useContext } from 'react';
import { Snackbar } from 'react-native-paper';
import { ThemeContext } from 'styled-components';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { snackbarUpdate } from '../../store/actions';

const SnackBar = () => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(snackbarUpdate({
            type: '',
            msg: ''
        }));
    }

    return (
        <Snackbar
            visible={authStore.message?.msg ? true : false}
            onDismiss={onClose}
            duration={7000}
            action={{
                label: 'Ok',
                onPress: onClose
            }}
            theme={{ colors: { surface: colors.backgroundColor, onSurface: authStore.message?.type === 'error' ? colors.errorColor : colors.textDeep, accent: colors.backgroundColor } }}
            wrapperStyle={{
                zIndex: 99999,
                top: 0,
            }}>
            {authStore.message?.msg ? authStore.message.msg : ''}
        </Snackbar>
    );
};


export default SnackBar;