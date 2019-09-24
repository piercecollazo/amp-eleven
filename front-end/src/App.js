import React, {Component} from 'react'
import './App.css'
import Navigation from './components/Nav'
import Home from './components/Home'
import Context from './context/Context';
import {apiSignIn} from './api/Api'

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

  signIn = (userInfo) => {

    apiSignIn(userInfo)
    .then( user => {
      this.setState({
        user: user.email,
        isAuth: true
      }, () => {
        return <Redirect to='/' />
      })

    })
    .catch( error => {
      console.log('Your login credentials are incorrect')
    })

  }

  render(){

    return (
      <Context.Provider
        value={{
          logout: this.logout,
          signIn: this.signIn,
          isAuth: this.state.isAuth
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
        