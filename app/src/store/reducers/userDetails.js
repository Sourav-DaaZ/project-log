import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils';

export const initialState = {
  id: '',
  name: '',
  gender: '',
  age: 0,
  userCat: '',
  expectedCat: [],
  location: {
    lat: 0,
    long: 0
  }
};

const locationUpdate = (state, action) => {
  return updateObject(state, {
    location: action.data
  });
};

const detailsUpdate = (state, action) => {
  return updateObject(state, {
    id: action.data.id,
    name: action.data.name,
    gender: action.data.gender,
    age: action.data.age,
    userCat: action.data.userCat,
    expectedCat: action.data.expectedCat,
    profileImg: action.data.profileImg,
  });
};


const DetailsReducer = (state = initialState, action = { type: '' }) => {
  switch (action.type) {
    case actionTypes.LOCATION:
      return locationUpdate(state, action);
    case actionTypes.DETAILS:
      return detailsUpdate(state, action);
    default:
      return state;
  }
};

export default DetailsReducer;
