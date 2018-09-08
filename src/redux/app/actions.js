import * as types from './types'
import Api from '../../api/EmployeeApi'

const { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE } = types;

export const getEmployeeDetailsAction = (id) => async dispatch => {
  dispatch({ type: API_CALL_REQUEST, payload: true });
  const properties = await Api.getEmployeeDetails(id);
  dispatch({ type: API_CALL_SUCCESS, properties });
  dispatch({ type: API_CALL_REQUEST, payload: false });
};
