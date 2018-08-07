import React from 'react';
import { connect } from 'react-redux';
import { filterStudentSuccess } from '../actions/users';
import './css/filter.css';

export class Filter extends React.Component {
  filterStudentsByPeriod(e) {
    this.props.dispatch(filterStudentSuccess(e.target.value))
  }

  render() {
    return (
      <div className="period-filter-select-container" role="region" aria-labelledby="region2">
        {/* <h5>Filter Students by Period</h5> */}
        <select htmlFor="periodfilterselect"className="period-filter-select" name="select" onChange={(e) => this.filterStudentsByPeriod(e)}>
          <option>FILTER PERIOD</option>
          {this.props.periods.map((period, i) => <option key={i} value={period.id}>{period.name}</option>)}
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  students: state.student.students.map(student => Object.assign({}, student, {
      periodNames: student.periods.map(period => (state.student.periods[period] || {}).name)
    })),
  periods: Object.values(state.student.periods),
  filter: null
});

export default connect(mapStateToProps)(Filter);