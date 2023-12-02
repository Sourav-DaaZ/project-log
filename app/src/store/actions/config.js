import * as actionTypes from './actionTypes';

export const configUpdate = (data) => {
    return {
        type: actionTypes.APP_CONFIG_UPDATE,
        data: data
    };
};

export const navigationUpdate = (data) => {
    return {
        type: actionTypes.NAVIGATION_UPDATE,
        data: data
    };
};

export const chatUpdate = (data) => {
    return {
        type: actionTypes.CHAT_UPDATE,
        data: data
    };
};
