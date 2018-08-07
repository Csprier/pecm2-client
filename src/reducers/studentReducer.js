import { GET_ALL_STUDENTS, GET_PERIODS_SUCCESS, DELETE_STUDENT_SUCCESS, DELETE_PERIOD_FROM_STUDENT_SUCCESS } from '../actions/students';
import { FILTER_STUDENT_SUCCESS } from '../actions/users';

export const initialState = {
  students: [],
  periods: {}
}

export default (state = initialState, action) => {
  if (action.type === GET_ALL_STUDENTS) {
    return Object.assign({}, state, {
      students: action.students
    });
  }

  if (action.type === GET_PERIODS_SUCCESS) {
    return Object.assign({}, state, {
      periods: action.periods
    });
  }

  if (action.type === FILTER_STUDENT_SUCCESS) {
    return Object.assign({}, state, {
      ...state,
      filter: action.filter 
    });
  }

  if (action.type === DELETE_STUDENT_SUCCESS) {
    return Object.assign({}, state, {
      ...state
    });
  }

  if (action.type === DELETE_PERIOD_FROM_STUDENT_SUCCESS) {
    return state;
  }
  return state;
}