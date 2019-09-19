import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from "./Home";
import Profile from "./Profile";
import About from "./About";
import Event from "./EventPage"
import NotFound from "./NotFound";

const Main = () => (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/Profile' component={Profile} />
        <Route path='/About' component={About}/>
        <Route path='/Event' component={Event}/>
        <Route component={NotFound} />
      </Switch>
    </main>
  )
  
  export default Main