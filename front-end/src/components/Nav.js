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


    stateUpdate = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    rememberUser = (event) =>{
        event.preventDefault()

        if(!this.state.remember){
            this.setState({
                remember: true
            })
        } else {
            this.setState({
                remember: false
            })
        }
    }

    handleSubmit = (event)=>{
        event.preventDefault()
        console.log(this.context.isAuth)

        this.context.signIn(this.state)
    }

    render (){

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
                                {this.context.isAuth === false ? 

                                <div className="dropdown-menu justify-content-end">
                                    <form className="px-4 py-3" onSubmit={this.handleSubmit}>
                                      <div className="form-group">
                                        <label htmlFor="exampleDropdownFormEmail1">Email address</label>
                                        <input type="email" className="form-control"                            id="exampleDropdownFormEmail1" placeholder="email@example.com" name='email' onChange={this.stateUpdate} />
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="exampleDropdownFormPassword1">Password</label>
                                        <input type="password" className="form-control"                             id="exampleDropdownFormPassword1" placeholder="Password" name='pass' onChange={this.stateUpdate} />
                                      </div>
                                      <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="dropdownCheck" />
                                        <label className="form-check-label" htmlFor="dropdownCheck" name='remember' onClick={this.rememberUser}>
                                          Remember me
                                        </label>
                                      </div>
                                      <button type="submit" className="btn btn-primary">Sign in</button>
                                    </form>
                                      <div className="dropdown-divider"></div>
                                      <Link className="dropdown-item" to="/">New around here? Sign up</Link>
                                      <Link className="dropdown-item" to="/">Forgot password?</Link>
                                    </div>
                            : 
                            <div className="dropdown-menu">
                            <h5>{this.context.user}</h5>
                            <Link className="dropdown-item" to="/">Account</Link>
                            <Link className="dropdown-item" to="/">Profile</Link>
                            <Link className="dropdown-item" to="/">Something else here</Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/" onClick={()=>{this.context.logout()}}>Logout</Link>
                            </div>
                            }
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
            
