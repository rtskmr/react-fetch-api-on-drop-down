import * as types from './types'
const { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE } = types;

const initialState = {
  fetching: false,
  employeeDetails: null,
  error: null
};

export function employeeReducer(state = initialState, action) {
  switch (action.type) {
    case API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };
    case API_CALL_SUCCESS:
      return { ...state, fetching: false, employeeDetails: action.properties.data };
    case API_CALL_FAILURE:
      return { ...state, fetching: false, employeeDetails: null, error: action.error };
    default:
      return state;
  }
}
