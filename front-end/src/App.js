import React, { Component } from 'react'
import {Route, Link, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'

import Nav from './components/Nav'
import Home from './components/Home'
import Profile from './components/Profile'
import Event from './components/EventPage'

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
        </div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/profile' component={Profile} />
          <Route path='/About' component={About} />
          <Route path='/Event' component={Event} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}


export default App;
