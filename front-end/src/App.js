import React, {Component} from 'react'
import './App.css'
import Navigation from './components/Nav'
import Home from './components/Home'
import Context from './context/Context';

import {Redirect} from 'react-router-dom'

export default class App extends Component {

  constructor(props){
    super(props)

    this.state={
      isAuth: false,
      user: null
    }
  }

  logout = () => {
    this.setState({
      user: null,
      message: 'Please login to use the app',
      isAuth: false
    }, () => {
      localStorage.removeItem('jwtToken')
      return <Redirect to='/' />
    })
  }

  signIn = (event)=>{
    this.setState({
      email: event.email,
      password: event.password,
      remember: event.remember
    })
  }
  render(){

    return (
      <Context.Provider
        value={{
          logout: this.logout,
          signIn: this.signIn
        }}
      >
         <div className="App">
          <Navigation />
          <Home />
        </div>
      </Context.Provider>
    );
  }
}
        