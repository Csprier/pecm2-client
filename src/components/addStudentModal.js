import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { toggleCreateStudentModal, createStudent, createStudentFailure } from '../actions/users';
import { listAllStudents, getAllPeriods } from '../actions/students';

import {required, nonEmpty} from '../validators';

class AddStudentModal extends React.Component {
  onClick() {
    this.props.dispatch(toggleCreateStudentModal());
  }  

  render() {
    return(
      <div className="modal">
        <button className="close-modal-btn" name="close-modal-button" type="button" onClick={() => this.onClick()}>Cancel</button>
        <form onSubmit={this.props.handleSubmit(values => {
            this.props.dispatch(createStudent(values.firstname, values.lastname))
            .then(() => this.props.dispatch(listAllStudents()))
            .then(() => this.props.dispatch(getAllPeriods()))
            .then(() => this.props.dispatch(toggleCreateStudentModal()))
          })}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="createfirstname">First Name</label>
                </td>
                <td>
                  <Field
                    aria-label="createfirstname"
                    name="firstname" 
                    id="firstname" 
                    type="text" 
                    component="input" 
                    validate={[required, nonEmpty]}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="createlastname">Last Name</label>
                </td>
                <td>
                  <Field 
                    aria-label="createlastname"
                    name="lastname" 
                    id="lastname" 
                    type="text" 
                    component="input"
                    validate={[required, nonEmpty]}
                    />
                </td>
              </tr>
              <tr>
                <td>
                  <button className="modal-button" name="submit-new-student" type="submit">SUBMIT</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default connect()(reduxForm({
  form: 'studentCreation',
  onSubmitFail: (error, dispatch) => dispatch(createStudentFailure(error))
})(AddStudentModal));