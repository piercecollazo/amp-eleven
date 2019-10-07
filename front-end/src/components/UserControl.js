import React, { Component } from 'react'
import Context from '../context/Context'

export default class UserControl extends Component {
    static contextType = Context

    constructor(props){
        super(props)

        this.state = {
            user:{
                username:'',
                email:'',
                newPassword:'',
                newPassConfirm:'',
                oldPassConfirm:'',
                genres:[],
                creator: false
            },
            event:{
                event: '',
                eventTitle: '',
                date: '',
                location: '',
                venue: '',
                price: ''
            }
        }
    }
    userStateUpdate = (event) => {
        event.preventDefault()
        this.setState({
            user:{[event.target.name]: event.target.value}
        })
    }

    eventStateUpdate = (event) => {
        event.preventDefault()
        this.setState({
            event:{[event.target.name]: event.target.value}
        })
    }

    genreUpdate = (event)=>{
        event.preventDefault()
        let tempArray = this.state.user.genres
        tempArray.includes(event.target.name) ? 
            tempArray.splice(tempArray.indexOf(event.target.name))
            :
            tempArray.push(event.target.name)

        this.setState({
            user:{genres: tempArray}
        })
        
    }

    handleProfileSubmit = (event)=>{
        event.preventDefault()
        console.log('submit filed from UserControl.js')
        this.context.userUpdate(this.state.user)
    }

    handleEventSubmit = (event)=>{
        event.preventDefault()
        console.log('submit filed from UserControl.js')
            this.context.eventAdd(this.state.event)
    }

    creatorCheck = ()=> {
        if(!this.state.user.creator){
            this.setState({
                user:{creator: true}
            })
        } else {
            this.setState({
                user:{creator: false}
            })
        }
    }

    render() {
        return (
            <div className='container user-control-container'>
                <form className='px-4 py-3' onSubmit={this.handleProfileSubmit}>
                    <h3>User Control</h3>
                    
                    <div className='form-group'>
                        <label>Username</label>
                        <input className='form-control' name='username' onChange={this.userStateUpdate} />
                    </div>

                    <div className='form-group'>
                        <label>Email</label>
                        <input className='form-control' name='email' onChange={this.userStateUpdate} />
                    </div>

                    <div className='form-group'>
                        <label>New Password</label>
                        <input className='form-control' name='newPassword' onChange={this.userStateUpdate} />
                    </div>

                    <div className='form-group'>
                        <label>Confirm Password</label>
                        <input className='form-control' name='newPassConfirm' onChange={this.userStateUpdate} />
                    </div>

                    <div className='form-check'>
                        <input type="checkbox" className="form-check-input" onClick={this.creatorCheck} />
                        <label>Creator toggle</label>
                    </div>
                    <hr />
                    <label>Creator Genre</label>
                    <div className='row'>
                        <div className='col'>
                            <div className='btn btn-primary' name='rock' onClick={this.genreUpdate}>Rock</div>
                        </div>

                        <div className='col'>
                            <div className='btn btn-primary' name='rap' onClick={this.genreUpdate}>Rap</div>
                        </div>

                        <div className='col'>
                            <div className='btn btn-primary' name='country' onClick={this.genreUpdate}>Country</div>
                        </div>

                        <div className='col'>
                            <div className='btn btn-primary' name='pop' onClick={this.genreUpdate}>Pop</div>
                        </div>

                        <div className='col'>
                            <div className='btn btn-primary' name='metal' onClick={this.genreUpdate}>Metal</div>
                        </div>

                        <div className='col'>
                            <div className='btn btn-primary' name='synthwave' onClick={this.genreUpdate}>Synthwave</div>
                        </div>

                    </div>

                    <hr />

                    <div className='row justify-content-end'>
                        <div className='col'>
                            <div className='form-group'>
                                <label>Confirm password before saving changes</label>
                                <input className='form-control' name='oldPassConfirm' onChange={this.stateUpdate} />
                            </div>
                        </div>

                        <button className='btn btn-primary' type='submit'>Submit</button>
                    </div>
                </form>
                <hr />
                <form className='px-4 py-3' onSubmit={this.handleEventSubmit}>
                    <h3>New event</h3>

                    <div className='form-group'>
                        <label>Event Title</label>
                        <input className='form-control' name='eventTitle' onChange={this.eventStateUpdate} />
                    </div>

                    <div className='form-group'>
                        <label>Event summary</label>
                        <input className='form-control' name='event' onChange={this.eventStateUpdate} />
                    </div>

                    <div className='form-group'>
                        <label>Event date</label>
                        <input className='form-control' name='date' onChange={this.eventStateUpdate} />
                    </div>

                    <div className='form-group'>
                        <label>Event address</label>
                        <input className='form-control' name='location' onChange={this.eventStateUpdate} />
                    </div>

                    <div className='form-group'>
                        <label>Event Venue name</label>
                        <input className='form-control' name='venue' onChange={this.eventStateUpdate} />
                    </div>

                    <div className='form-group'>
                        <label>Price of admission</label>
                        <input className='form-control' name='price' onChange={this.eventStateUpdate} />
                    </div>

                    <button className='btn btn-success' type='submit'>Submit event</button>
                </form>
            </div>
        )
    }
}
