import React, { Component } from 'react'
import Context from '../context/Context'

import poster from '../Assets/images/poster.jpg'

export default class EventPage extends Component {
  static contextType = Context

  constructor(props){
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div className='container event-page'>
        <div className='row'>
          <div className='col'>

          </div>

          <div className='col text-white'>
            <img src={poster} alt=''></img>
          </div>

          <div className='col'>

          </div>
        </div>
      </div>
    )
  }
}
