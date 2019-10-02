import React, { Component } from 'react'
import Context from '../context/Context'

export default class UserControl extends Component {
    static contextType = Context

    constructor(props){
        super(props)

        this.state = {
            username:'',
            email:'',
            newPassword:'',
            newPassConfirm:'',
            oldPassConfirm:'',
            genres:[],
            creator: false
        }
    }
    stateUpdate = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    genreUpdate = (event)=>{
        event.preventDefault()
        let tempArray = this.state.genres
        tempArray.includes(event.target.name) ? 
            tempArray.splice(tempArray.indexOf(event.target.name))
            :
            tempArray.push(event.target.name)

        this.setState({
            genres: tempArray
        })
        
    }

    handleSubmit = (event)=>{
        event.preventDefault()

        this.context.userUpdate(this.state)
    }

    creatorCheck = ()=> {
        if(!this.state.creator){
            this.setState({
                creator: true
            })
        } else {
            this.setState({
                creator: false
            })
        }
    }

    render() {
        return (
            <div className='container user-control-container'>
                <form className='px-4 py-3' onSubmit={this.handleSubmit}>
                    <h3>User Control</h3>
                    
                    <div className='form-group'>
                        <label>Username</label>
                        <input className='form-control' name='username' onChange={this.stateUpdate} />
                    </div>

                    <div className='form-group'>
                        <label>Email</label>
                        <input className='form-control' name='email' onChange={this.stateUpdate} />
                    </div>

                    <div className='form-group'>
                        <label>New Password</label>
                        <input className='form-control' name='newPassword' onChange={this.stateUpdate} />
                    </div>

                    <div className='form-group'>
                        <label>Confirm Password</label>
                        <input className='form-control' name='newPassConfirm' onChange={this.stateUpdate} />
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

                        <div className='btn btn-danger' type='submit'>Submit</div>
                    </div>
                </form>
            </div>
        )
    }
}
