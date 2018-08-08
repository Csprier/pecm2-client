import React from 'react';
import { connect } from 'react-redux';
import './css/student.css';
import avatar from './css/avatar.png';

import { assignPeriodToStudent, deleteStudent, deletePeriodFromStudent } from '../actions/students';

class StudentList extends React.Component {
  onChange(e, id) {
    this.props.dispatch(assignPeriodToStudent(id, e.target.value))
  }

  onClick() {
    const studentIdToBeDeleted = this.props.studentIds.find(student => student.id === this.studentIds);
    this.props.dispatch(deleteStudent(studentIdToBeDeleted.student));
  }

  deletePeriod = (student, period) => {
    const periodId = this.props.periods.filter(peri => peri.name === period)[0].id;
    this.props.dispatch(deletePeriodFromStudent(student.id, periodId));
  }

  removeDuplicates(arr) {
    let uniqueArray = [];
    for (let i = 0; i < arr.length; i++) {
      if (uniqueArray.indexOf(arr[i]) === -1 && arr[i] !== undefined) {
        uniqueArray.push(arr[i])
      }
    }
    return uniqueArray;
  }

  render() {
    let studentList = this.props.students;
    let filteredStudents = studentList.filter(student => student.periods.includes(this.props.filter));
    let listOfStudentsToBeRendered = this.props.students;

    if (this.props.filter === undefined || this.props.filter === 'FILTER PERIOD') {
      listOfStudentsToBeRendered = studentList;
    } else if (this.props.filter !== null) {
      listOfStudentsToBeRendered = filteredStudents;
    }

    return (
      <ul className="student-list">
       {listOfStudentsToBeRendered.map((student, i) => 
          <li className="student-row" key={i}>

            <div className="image-container">
              <div className="student-info">
                <h2>{student.firstname} {student.lastname}</h2>
              </div>
              <img role="presentation" src={avatar} alt="avatarIcon" className="avatar-img" />
            </div>

          <div className="right-box">
            <div className="period-select-container">
              <select htmlFor="periodselect" className="period-select" name="select" onChange={(e, id) => this.onChange(e, student.id)}>
                <option>SELECT PERIOD</option>
                {this.props.periods.map((period, i) => <option key={i} value={period.id}>{period.name}</option>)}
              </select>
            </div>

            <div className="list-of-students-periods">
                {this.removeDuplicates(student.periodNames).map((period, i) => 
                <p key={i}> 
                  {period} 
                  <button className="delete-period-button" onClick={() => this.deletePeriod(student, period)}>X</button>
                </p>)}
            </div>
          </div>
          <button className="delete-student-button" onClick={() => {this.onClick()}} name="delete-student" type="button">X</button>
          </li>)}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  students: state.student.students.map(student => Object.assign({}, student, {
    periodNames: student.periods.map(period => (state.student.periods[period] || {}).name)
  })),
  periods: Object.values(state.student.periods),
  filter: state.student.filter,
  studentIds: state.student.students.map(student => {
    return { student: student.id }
  })
});

export default connect(mapStateToProps)(StudentList);

