import React from 'react';
import { connect } from 'react-redux';
import { listAllStudents, getAllPeriods } from '../actions/students';
import Filter from './filter';
// import StudentList from './student-list';
import AddStudent from './addStudent';
// import './css/student-list.css';
import './css/user-controls.css';
import { logoutUser } from '../actions/users';

class UserControls extends React.Component {
  componentDidMount() {
    this.props.dispatch(listAllStudents());
    this.props.dispatch(getAllPeriods());
  }

  onClickLogout = () => {
    this.props.dispatch(logoutUser())
    this.props.history.push('/')
  }

  render(){
    return (
      <nav className="app-container" role="region" aria-labelledby="region1">
        <div className="teacher-controls">
          <button className="logout-button" onClick={this.onClickLogout}>LogOut</button>
          <Filter />
          <AddStudent />
        </div>
      </nav>
    );
  }
}
export default connect()(UserControls);