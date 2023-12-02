import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils';

export const initialState = {
  appConfig: null,
  navigation: null,
  chatUpdate: ''
};

const appConfigUpdate = (state, action) => {
  return updateObject(state, {
    appConfig: action.data
  });
};

const navigationUpdate = (state, action) => {
  return updateObject(state, {
    navigation: action.data
  });
};

const chatUpdate = (state, action) => {
  return updateObject(state, {
    chatUpdate: action.data
  });
};


const DetailsReducer = (state = initialState, action = { type: '' }) => {
  switch (action.type) {
    case actionTypes.APP_CONFIG_UPDATE:
      return appConfigUpdate(state, action);
    case actionTypes.NAVIGATION_UPDATE:
      return navigationUpdate(state, action);
    case actionTypes.CHAT_UPDATE:
      return chatUpdate(state, action);
    default:
      return state;
  }
};

export default DetailsReducer;
