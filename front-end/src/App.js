import React, {Component} from 'react'
import './App.css'
import Navigation from './components/Nav'
import Context from './context/Context';
import {apiSignIn, apiSignUp} from './api/Api'
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'

import Home from './components/Home'
import SignUp from './components/SignUp'
import NotFound from './components/NotFound'

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
                console.log(this.state)
                return <Redirect to='/' />
              })
            
            })
            .catch( error => {
              console.log('Your login credentials are incorrect', error)
            })

  }

  signUp = (userInfo)=>{
    if(userInfo.passConfirm === userInfo.pass){
      apiSignUp(userInfo)
              .then( user => {
              this.setState({
                user: user.email,
                isAuth: true
              }, () => {
                console.log(this.state)
                return <Redirect to='/' />
              })

              })
              .catch( error => {
                console.log(`Something happened, error: ${error}`)
              })
    }

  }

  render(){

    return (
      <Context.Provider
        value={{
          logout: this.logout,
          signIn: this.signIn,
          isAuth: this.state.isAuth,
          signUp: this.signUp
        }}
      >
        <Router>

         <div className="App">
          <Navigation />
        </div>

        <Switch>
          <Route exact path='/' render={(props) => <Home {...props}/>} />
          <Route path="/signup" render={(props) => <SignUp  {...props} />} />
          <Route component={NotFound} />
        </Switch>
        </Router>
      </Context.Provider>
    );
  }
}
        