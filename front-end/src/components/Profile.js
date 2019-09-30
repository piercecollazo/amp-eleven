import React, { Component } from 'react'
import Context from '../context/Context'

import axolotl from '../Assets/images/axolotl.jpg'
import { apiUserGet } from '../api/Api';

export default class Profile extends Component {
  static contextType = Context

  constructor(props){
    super(props)

    this.state={
      follows: [],
      followers: [],
      posts: []
    }
  }
  componentWillMount(){
    this.profileCatch()
  }
  profileCatch = ()=>{
    console.log('Next line is profileCatch')
    console.log(this.context)
    apiUserGet(this.context.user.id)

              .then(userProfile => {
                console.log('profileCatch function ' + userProfile)
                // this.setState({
                //   follows: userProfile.follows,
                //   followers: userProfile.followers
                // })
              },this.context.fillFollowerList(), this.context.fillFollowsList())
              .catch(error => {
                console.log('User call failed')
              })
  }

  render() {
    return (
      <div className='container profile'>
        <div className='row'>
          <div className='col-lg-4'>
            <div className='card'>
              <img className='img-thumbnail' src={axolotl} alt='' />
              <div className='card-body mx-auto text-center'>
                A basic profile description
              </div>
              <div className='card-footer'>
                <div className='btn btn-primary'>Follow +</div>
              </div>
            </div>
          </div>
          <div className='col-lg-4'>Test 2</div>
          <div className='col-lg-4'>
            <ul>
              {/* {this.profileCatch} */}
            </ul>
          </div>
        </div>
        
      </div>
    )
  }
}
