import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import UserCreation from './components/user-creation-form';
import UserLogin from './components/user-login-form';
import Onboarding from './components/onboarding';

import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header" role="banner">
            <h1>Physical Education Class Manager</h1>
          </header>
          <Router>
            <main role="main">
              <Route exact path="/" component={UserCreation} />
              <Route exact path="/" component={UserLogin} />
              <Route exact path="/" component={Onboarding}/>
            </main>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
