import * as actionTypes from './actionTypes';

export const location = (data) => {
    return {
        type: actionTypes.LOCATION,
        data: data
    };
};

export const detailsUpdate = (data) => {
    return {
        type: actionTypes.DETAILS,
        data: data
    };
};
