import React, {Component} from 'react'
import './App.css'
import Navigation from './components/Nav'
import Context from './context/Context';
import {apiSignIn, apiSignUp} from './api/Api'
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'

import Home from './components/Home'
import SignUp from './components/SignUp'
import NotFound from './components/NotFound'
import Profile from './components/Profile'
import About from './components/About'
import EventPage from './components/EventPage'

export default class App extends Component {

  constructor(props){
    super(props)

    this.state={
      isAuth: false,
      user: null
    }
  }

  fillFollowerList = (user) => {
    if(user){
      return user.map((item)=>{
        return <li key={item.id} className="followers">
                {item.username}
              </li>
      })
    } else {
      console.log('function outrun by component')
    }
    }
  
  fillFollowsList = (user) => {
    if(user){
      return user.map((item)=>{
        return <li key={item.id} className="follows">
                {item.username}
              </li>
      })
    } else {
      console.log('function outrun by component')
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
                user: user,
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
              .then( (user) => {
                console.log(user._id)
              this.setState({
                user: user.email,
                isAuth: true
              }, () => {
                console.log('secondary function firing')
                return <Redirect to='/' />
              }
              )

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
          signUp: this.signUp,
          user: this.state.user,
          fillFollowsList: this.fillFollowsList,
          fillFollowerList: this.fillFollowerList
        }}
      >
        <Router>
        <Navigation />
        <Switch>
          <Route exact path='/' render={(props) => <Home {...props}/>} />
          <Route path="/signup" render={(props) => <SignUp  {...props} />} />
          <Route path="/profile/:id" render={(props) => <Profile {...props} />} />
          <Route exact path="/About" render={(props) => <About  {...props} />} />
          <Route path="/event" render={(props) => <EventPage  {...props} />} />
          <Route component={NotFound} />
        </Switch>
        </Router>
      </Context.Provider>
    );
  }
}
        