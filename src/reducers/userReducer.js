import { CREATE_STUDENT_FAILURE, TOGGLE_CREATE_STUDENT_MODAL, REGISTER_NEW_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, CREATE_STUDENT_SUCCESS, LOGOUT_USER } from '../actions/users';

const initialState = {
  modalView: false
};

export default (state=initialState, action) => {
  if(action.type === TOGGLE_CREATE_STUDENT_MODAL){
    return {
      ...state,
      modalView: !state.modalView,
    };
  }

  if(action.type === REGISTER_NEW_USER) {
    return Object.assign({}, state, {
      ...state,
      fullname: action.fullname,
      username: action.username
    });
  }
  
  if (action.type === LOGIN_USER_SUCCESS) {
    return Object.assign({}, state, {
      ...state,
      username: action.username,
      token: action.token,
      error: ''
    });
  }

  if (action.type === LOGIN_USER_FAILURE) {
    return {
      ...state,
      error: action.error
    }
  }

  if (action.type === LOGOUT_USER) {
    return Object.assign({}, state, {
      ...state,
      username: null,
      token: null
    });
  }

  if (action.type === CREATE_STUDENT_SUCCESS) {
    return {
      ...state,
      firstname: action.firstname,
      lastname: action.lastname  
    }
  }

  if (action.type === CREATE_STUDENT_FAILURE) {
    return {
      error: action.error
    }
  }
  return state;
}
