import * as actionTypes from './actionTypes';
import ReduxStore from '../../store';
import { detailsUpdate } from '../actions';
import { removeFromStore, saveFncToStore } from '../../utils';
const { dispatch } = ReduxStore;

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const loader = (loading) => {
    return {
        type: actionTypes.LOADING,
        loading: loading
    };
};


export const tokenUpdate = (data) => {
    if (data.access_token === '') {
        removeFromStore('token');
        removeFromStore('userData');
        removeFromStore('chatData');
        removeFromStore('chatList');
        dispatch(detailsUpdate({
            id: '',
            name: '',
            gender: '',
            age: 0,
            userCat: [],
            expectedCat: [],
        }))
    } else {
        saveFncToStore('token', data);
    }
    return {
        type: actionTypes.TOKEN_UPDATE,
        data: data
    };
};

export const snackbarUpdate = (data) => {
    return {
        type: actionTypes.SNACK_BAR,
        data: data
    };
};

export const fTokenUpdate = (data) => {
    return {
        type: actionTypes.F_TOKEN_UPDATE,
        data: data
    };
};