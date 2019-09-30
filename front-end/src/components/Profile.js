import React, { Component } from 'react'
import Context from '../context/Context'

import axolotl from '../Assets/images/axolotl.jpg'
import { apiUserGet } from '../api/Api';

export default class Profile extends Component {
  static contextType = Context

  constructor(props){
    super(props)

    this.state = {
      profileUser: {followers:['test']},
    }
  }
  componentWillMount(){
    let query = this.props.match.params.id
    console.log('this query is: ' + query)
    this.profileCatch(query)
  }

  profileCatch = (id)=>{
    console.log(id)
    apiUserGet(id)
              .then(userProfile => {
                console.log(userProfile)
                this.setState({
                  profileUser: userProfile.data
                })
              },console.log(this.state.profileUser))
              .catch(error => {
                console.log('User call failed')
                console.log(error)
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
                <hr></hr>
                <h5>Followers</h5>
                <ul>
                  {console.log(this.state.profileUser)}
                  {this.state.profileUser.followers.map((item)=>{
                    return <li key={item} className="followers">{item}</li>})}
                </ul>
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
