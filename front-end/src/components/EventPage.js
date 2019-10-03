import React, { Component } from 'react'
import Context from '../context/Context'
import GoogleMap from './MapContainer'

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
            <h1 className='text-center text-white'>DFA moshfest</h1>
        <div className='row'>
          <div className='col-lg-3 mx-5'>
            <div className='map'>
            <GoogleMap />
            </div>
            
          </div>

          <div className='col-lg-4 text-white'>
            <img className='poster' src={poster} alt=''></img>
          </div>

          <div className='col-lg-3'>
            <div className='card'>
              <div className='card-header'>Get in on the action</div>

              <div className='card-body'>
                <form>
                  <div className='form-group'>
                    <label>Quantity</label>
                    <input className='form-control quantity-input' name='quantity' />
                    <br />
                    <div className='btn btn-primary'>Buy now!</div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col text-white text-center address'>
            <h4>October 7th at 10pm</h4>
            <h5>Jacob K. Javits Convention Center, 11th Avenue, New York, NY</h5>
          </div>

          <div className='col text-center text-white summary'>
            
          </div>

          <div className='col'></div>
        </div>
        <hr />
        <div className='row'>
          <div className='col text-center text-white'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam vestibulum morbi blandit cursus risus at. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Proin fermentum leo vel orci. Sed turpis tincidunt id aliquet risus. Bibendum arcu vitae elementum curabitur vitae nunc sed. Mauris cursus mattis molestie a. Turpis massa sed elementum tempus egestas sed sed. Cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Consequat nisl vel pretium lectus quam. Phasellus vestibulum lorem sed risus. Vitae semper quis lectus nulla at volutpat diam ut. Morbi tincidunt augue interdum velit. Nunc lobortis mattis aliquam faucibus purus. Congue nisi vitae suscipit tellus mauris. Purus in mollis nunc sed id semper risus in hendrerit. Congue quisque egestas diam in arcu cursus euismod. Leo integer malesuada nunc vel risus commodo viverra maecenas. Eleifend mi in nulla posuere sollicitudin aliquam ultrices.</p>
          </div>
        </div>
      </div>
    )
  }
}
