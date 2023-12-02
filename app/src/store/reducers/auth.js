import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils';

export const initialState = {
  firebase_token: null,
  access_token: null,
  refresh_token: '',
  loading: false,
  message: {
    type: 'error',
    msg: ''
  }
};

const loader = (state, action) => {
  return updateObject(state, {
    loading: action.loading
  });
};

const tokenUpdate = (state, action) => {
  if (action.data) {
    return updateObject(state, {
      access_token: action.data.access_token,
      refresh_token: action.data.refresh_token,
    });
  } else {
    return null
  }
};

const snackbarUpdate = (state, action) => {
  return updateObject(state, {
    message: action.data,
  });
};

const fTokenUpdate = (state, action) => {
  return updateObject(state, {
    firebase_token: action.data,
  });
};

const AuthReducer = (state = initialState, action = { type: '' }) => {
  switch (action.type) {
    case actionTypes.LOADING:
      return loader(state, action);
    case actionTypes.TOKEN_UPDATE:
      return tokenUpdate(state, action);
    case actionTypes.SNACK_BAR:
      return snackbarUpdate(state, action);
    case actionTypes.F_TOKEN_UPDATE:
      return fTokenUpdate(state, action);
    default:
      return state;
  }
};

export default AuthReducer;
