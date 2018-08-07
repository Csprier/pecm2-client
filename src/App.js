import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import UserCreation from './components/user-creation-form';
import UserLogin from './components/user-login-form';
import Onboarding from './components/onboarding';
import UserControls from './components/user-controls';
import StudentList from './components/StudentList';

import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header" role="banner">
            <img src="https://media.istockphoto.com/photos/gymnasium-at-middle-school-picture-id178377389?k=6&m=178377389&s=612x612&w=0&h=XcDFMubuq0nkUcxUkwd6kcWxDEDyMu_E5EtIlPo7KPM=" alt="gym" />
            <h1>Physical Education Class Manager</h1>
          </header>
          <Router>
            <main role="main">
              <div className="landing-page">
                <div className="form-container">
                  <Route exact path="/" component={UserCreation} />
                  <Route exact path="/" component={UserLogin} />
                </div>
                <Route exact path="/" component={Onboarding}/>
              </div>
                <Route exact path="/UserControls" component={UserControls} />
                <Route exact path="/UserControls" component={StudentList} />
            </main>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
