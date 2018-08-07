import { API_BASE_URL } from '../config';

// ===== GET/LIST ALL STUDENTS ACTION AND THUNK ==========================================
export const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS';
export const getAllStudents = (students) => ({
  type: GET_ALL_STUDENTS,
  students
});

export const listAllStudents = () => dispatch => {
  return fetch(`${API_BASE_URL}/api/students`, {
    method: 'GET',
  })
  .then(res => res.json())
  .then(json => dispatch(getAllStudents(json)))
  .catch(err => console.error(err));
}

// ===== PERIOD ASSIGNMENT ACTIONS AND THUNK ==========================================
export const PERIOD_ASSIGNMENT_SUCCESS = 'PERIOD_ASSIGNMENT_SUCCESS';
export const periodAssignmentSuccess = (period) => ({
  type: PERIOD_ASSIGNMENT_SUCCESS,
  period
});

export const assignPeriodToStudent = (id, period) => dispatch => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, period })
  }

  return fetch(`${API_BASE_URL}/api/students/${id}/periods`, options)
    .then(res => res.json())
    .then(() => {
      dispatch(periodAssignmentSuccess(period))
      return dispatch(listAllStudents());
    })
  .catch(err => console.error(err));
}

// ==== GET LIST OF ALL PERIODS ==========================================
export const GET_PERIODS_SUCCESS = 'GET_PERIODS_SUCCESS';
export const getPeriodsSuccess = ({ periods }) => ({
  type: GET_PERIODS_SUCCESS,
  periods
});

export const getAllPeriods = () => dispatch => {
  return fetch(`${API_BASE_URL}/api/periods`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(result => {
    dispatch(getPeriodsSuccess({
      periods: result.reduce((map, { id, ...values }) => ({ ...map, [id]: { id, ...values }}), {}) // Make an object out of the array
    }))
  })
  .catch(err => console.error(err));
};

// ==== DELETE A PERIOD FROM A STUDENT ================================
export const DELETE_PERIOD_FROM_STUDENT_SUCCESS = 'DELETE_PERIOD_FROM_STUDENT_SUCCESS';
export const deletePeriodFromStudentSuccess = () => ({
  type: DELETE_PERIOD_FROM_STUDENT_SUCCESS,
})

export const deletePeriodFromStudent = (studentId, periodId) => (dispatch) => {
  return fetch(`${API_BASE_URL}/api/students/${studentId}/periods/${periodId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(() => {
    dispatch(deletePeriodFromStudentSuccess())
    return dispatch(listAllStudents());
  })
  .catch(err => console.error(err))
}



// DELETE A STUDENT
export const DELETE_STUDENT_SUCCESS = 'DELETE_STUDENT_SUCCESS';
export const deleteStudentSuccess = () => ({
  type: DELETE_STUDENT_SUCCESS
})

export const deleteStudent = studentId => (dispatch) => {
  return fetch(`${API_BASE_URL}/api/students/${studentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(() => {
    dispatch(deleteStudentSuccess())
    return dispatch(listAllStudents());
  })
  .catch(err => console.error(err));
}