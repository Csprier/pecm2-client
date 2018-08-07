import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import studentReducer from './reducers/studentReducer';

export default createStore(
  combineReducers({
    form: formReducer,
    user: userReducer,  
    student: studentReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);