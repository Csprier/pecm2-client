import React from 'react';
import { connect } from 'react-redux';
import './css/onboarding.css'

export class Onboarding extends React.Component {
  render() {
    return (
      <div className="onboarding-content">
        <h2>Welcome to PECM!</h2>
        <p>This is a tool teachers can use on their mobile devices to help organize daily class scheduling. </p>
        <p>Create an account! Upon creation, you will be automatically logged in.</p>
        <p>If you already have an account, simply log in!</p>
        <p>You will be presented with a database of students.</p>
        <p>From there, you have the option to add or delete students. Assign them periods to be scheduled, and filter the list to see which students are in a specific period.</p>
      </div>
    )
  }
}


export default connect()(Onboarding);