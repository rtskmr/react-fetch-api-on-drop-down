/**
 * Combined reducer
 */

import { combineReducers } from 'redux';
import { employeeReducer } from './app/reducers';

export default combineReducers({
  employeeReducer
});
