import React, { Component } from 'react'
import {Route, Link, BrowserRouter as Router, Switch, Redirect} from 
'react-router-dom'
import './App.css'

import Nav from './components/Nav'
import Home from './components/Home'
import Profile from './components/Profile'
import Event from './components/EventPage'
import About from './components/About'
import NotFound from './components/NotFound'

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
        </div>
        <br/>
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



