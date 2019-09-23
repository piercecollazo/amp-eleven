import React, { Component } from 'react'
import { Link, Route, BrowserRouter as Router, Switch, } from 'react-router-dom'
import Context from '../context/Context'

import Home from './Home'
import About from './About'
import Event from './EventPage'
import Profile from './Profile'
import NotFound from './NotFound'

export default class Nav extends Component {
    static contextType = Context

    constructor(props){
        super(props)

        this.state={
            email: '',
            pass: '',
            remember: false
        }
    }

    

    render (){
        const { isAuth, user, logout, signIn } = this.context

        return (
                <Router>
                    <nav className="navbar navbar-expand-lg bg-secondary text-uppercase     fixed-top" id="mainNav">
                        <div className="container">
                          
                          <Link to="/">Home</Link>
                          
                          <button className="navbar-toggler navbar-toggler-right        text-uppercase font-weight-bold bg-primary text-white   rounded" type="button" data-toggle="collapse"        data-target="#navbarResponsive"     aria-controls="navbarResponsive" aria-expanded="false"        aria-label="Toggle navigation">
                            Menu
                            <i className="fas fa-bars"></i>
                          </button>
    
                          <div className="collapse navbar-collapse"     id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
    
                            <li className="nav-item mx-0 mx-lg-1">
                                <Link to="/About">About</Link>
                              </li>
                              
                              <li className="nav-item mx-0 mx-lg-1">
                                <Link to="/Profile">Profile</Link>
                              </li>
                              
                              <li className="nav-item mx-0 mx-lg-1">
                                <Link to="/Event">Event</Link>
                              </li>
                              
                              <li className="nav-item mx-0 mx-lg-1">
                                <i className="material-icons" data-toggle='dropdown'>person</i>
                                <div className="dropdown-menu justify-content-end">
                                    <form className="px-4 py-3" onSubmit={()=>{signIn()}}>
                                      <div className="form-group">
                                        <label for="exampleDropdownFormEmail1">Email address</label>
                                        <input type="email" class="form-control"                            id="exampleDropdownFormEmail1" placeholder="email@example.com" />
                                      </div>
                                      <div className="form-group">
                                        <label for="exampleDropdownFormPassword1">Password</label>
                                        <input type="password" class="form-control"                             id="exampleDropdownFormPassword1" placeholder="Password" />
                                      </div>
                                      <div className="form-check">
                                        <input type="checkbox" class="form-check-input" id="dropdownCheck" />
                                        <label className="form-check-label" for="dropdownCheck">
                                          Remember me
                                        </label>
                                      </div>
                                      <button type="submit" class="btn btn-primary">Sign in</button>
                                    </form>
                                      <div className="dropdown-divider"></div>
                                      <Link className="dropdown-item" to="/">New around here? Sign up</Link>
                                      <Link className="dropdown-item" to="/">Forgot password?</Link>
                                    </div>
                              </li>
                              
                            </ul>
                          </div>
                        </div>
                    </nav>
    
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
            
