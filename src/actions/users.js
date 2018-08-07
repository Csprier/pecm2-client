import { API_BASE_URL } from '../config';

// ---CREATE ---------------------------------------------------------------------------------
export const REGISTER_NEW_USER = 'REGISTER_NEW_USER';
export const registerNewUser = (id, username, fullname) => ({
	type: REGISTER_NEW_USER,
  id,
  username,  
  fullname
});

export const registerNewUserHandler = (username, password, fullname) => dispatch => {
  const newUser = { fullname, username, password };

  return fetch(`${API_BASE_URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
  .then(res => res.json())
  .then(json => dispatch(registerNewUser(json)))
  .then(() => dispatch(loginUserHandler(username, password)))
  .catch(err => console.error(err));
}

// ---LOGIN ---------------------------------------------------------------------------------
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const loginUserSuccess = (username, token) => ({
  type: LOGIN_USER_SUCCESS,
  username,
  token
})

export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const loginUserFailure = (error) => ({
  type: LOGIN_USER_FAILURE,
  error
})

export const loginUserHandler = (history, username, password) => dispatch => {
  const user = {
    username,
    password
  };

  const myHeaders = new Headers();

  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');

  return fetch(`${API_BASE_URL}/api/login`, {
    method: 'POST',
    headers: myHeaders,
    mode: 'cors',
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.status !== 200) {
      throw new Error ('Username or password is incorrect!');
    }
    return res.json()
  })
  .then(({ authToken }) => dispatch(loginUserSuccess(username, authToken)))
  .then(() => history.push('/UserControls')) 
  .catch(err => {
    dispatch(loginUserFailure(err.message));
  });
}

export const LOGOUT_USER = 'LOGOUT_USER';
export const logoutUser = () => ({
  type: LOGOUT_USER
})

// ---FILTER STUDENTS ---------------------------------------------------------------------------------
export const FILTER_STUDENT_SUCCESS = 'FILTER_STUDENT_SUCCESS';
export const filterStudentSuccess = (filter) => ({
  type: FILTER_STUDENT_SUCCESS,
  filter
})

// ---ADD STUDENT------------------------------------------------
export const TOGGLE_CREATE_STUDENT_MODAL = 'TOGGLE_CREATE_STUDENT_MODAL';
export const toggleCreateStudentModal = () => ({
  type: TOGGLE_CREATE_STUDENT_MODAL
})

export const CREATE_STUDENT_SUCCESS = 'CREATE_STUDENT_SUCCESS';
export const createStudentSuccess = (student) => ({
  type: CREATE_STUDENT_SUCCESS,
  student
});

export const createStudent = (firstname, lastname) => dispatch => {
  const student = {
    firstname,
    lastname
  };

  return fetch(`${API_BASE_URL}/api/students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(student)
  })
  .then(res => res.json())
  .then(() => dispatch(createStudentSuccess(student)))
  .catch(err => console.error(err))
}
