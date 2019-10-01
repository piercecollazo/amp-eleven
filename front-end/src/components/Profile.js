import React, { Component } from 'react'
import Context from '../context/Context'
import {Link} from 'react-router-dom'

import beavisButthead from '../Assets/images/beavis-butthead.jpg'
import slayer from '../Assets/images/slayer.jpg'
import megadeth from '../Assets/images/megadeth.png'
import metallica from '../Assets/images/metallica.jpeg'
import spinaltap from '../Assets/images/spinal-tap.jpeg'
import { apiUserGet, apiUserFollow } from '../api/Api';

export default class Profile extends Component {
  static contextType = Context

  constructor(props){
    super(props)

    this.state = {
        id: '',
        username: 'default',
        follows: ['1'],
        followers: ['1'],
        events: ['1'],
        genres: ['1'],
        dateJoined: ''
    }
  }
  componentDidMount(){
    let query = this.props.match.params.id
    this.profileCatch(query)
  }

  profileCatch = (id)=>{
    apiUserGet(id)
              .then(userProfile => {
                console.log(userProfile.data)
                this.setState({
                  id: userProfile.data._id,
                  username: userProfile.data.profile.username,
                  follows: userProfile.data.follows,
                  followers: userProfile.data.followers,
                  events: userProfile.data.events,
                  genres: userProfile.data.genres,
                  dateJoined: userProfile.data.timestamp
                })
              },console.log(this.state))
              .catch(error => {
                console.log('User call failed')
                console.log(error)
              })
  }

  follow=(target, user)=>{
    apiUserFollow(target, user)
            .then(result=>{
              this.setState({
                follows: result.follows,
                followers: result.followers
              })
            })
            .catch(error=>{
              console.log(error)
            })
  }
  render() {
    return (
      <div className='container profile'>
        <div className='row'>
          <div className='col-lg-4'>
            <div className='card'>
              <img className='img-thumbnail' src={beavisButthead} alt='' />
              <h5>{this.state.username}</h5>
              <div className='card-body mx-auto text-center'>
                A basic profile description
              </div>
              <div className='card-footer'>
                
              <div className='btn btn-primary' onClick={()=>{this.follow(this.state.id, this.context.user.id)}}>Follow +</div>
                  <hr></hr>
                <h5>Followers: {this.state.followers.length} </h5>
                <h5>Following: {this.state.follows.length} </h5>

              </div>
            </div>
          </div>
          <div className='col-lg-4 text-white'>
            <h5>What's new</h5>
            <ul>
              {this.state.events.length < 1 ? 
              <div>There's nothing here but us chickens. Go follow some creators, dude!</div>
              :
              <div>This is where I'd put my events...IF I HAD ONE!</div>
            }
            </ul>
          </div>
          <div className='col-lg-4 text-white'>
            <h4>Recommended creators</h4>
            <ul>
              <li>
                <Link to={`/profile`}><img className="avatar mx-auto img-fluid" src={slayer} alt=''></img></Link>
                <span> Slayer</span>
              </li>

              <li>
                <Link to={`/profile`}><img className="avatar mx-auto img-fluid" src={metallica} alt=''></img></Link>
                <span> Metallica</span>
              </li>

              <li>
                <Link to={`/profile`}><img className="avatar mx-auto img-fluid" src={megadeth} alt=''></img></Link>
                <span> Megadeth</span>
              </li>

              <li>
                <Link to={`/profile`}><img className="avatar mx-auto img-fluid" src={spinaltap} alt=''></img></Link>
                <span> Spinal Tap</span>
              </li>
            </ul>

          </div>
        </div>
        
      </div>
    )
  }
}
