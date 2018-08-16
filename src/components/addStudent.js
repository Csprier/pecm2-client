import React from 'react';
import { connect } from 'react-redux';
import './css/addStudent.css';
import { toggleCreateStudentModal } from '../actions/users';
import AddStudentModal from './addStudentModal';

class AddStudentToDatabase extends React.Component {
  onClick() {
    this.props.dispatch(toggleCreateStudentModal());
  }

  render() {
    return (
      <div className="add-student-form-container">
        {
          (this.props.modalView) 
          ? <AddStudentModal /> 
          : <button className="create-student-btn" id="create-student-modal" onClick={() => this.onClick()}>ADD STUDENT</button>
        }
        {
          (this.props.error) 
          ? <span>{this.props.error.lastname || this.props.error.firstname}</span>
          : undefined
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modalView: state.user.modalView,
  error: state.user.error
})

export default connect(mapStateToProps)(AddStudentToDatabase);