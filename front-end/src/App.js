import React, { Component } from 'react'
import {Route, Link, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'

import Nav from './components/Nav'
import Home from './components/Home'

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
        </div>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </Router>
    )
  }
}


export default App;
