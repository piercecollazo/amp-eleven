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
            genres:[]
        }
    }
    stateUpdate = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event)=>{
        event.preventDefault()

        this.context.userUpdate(this.state)
    }

    render() {
        return (
            <div className='container user-control-container'>
                <form className='px-4 py-3'>
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
                        <input type="checkbox" className="form-check-input" />
                        <label>Creator toggle</label>
                    </div>
                    <hr />
                    <label>Creator Genre</label>
                    <div className='row'>
                        <div className='col'>
                            <div className='btn btn-primary'>Rock</div>
                        </div>

                        <div className='col'>
                            <div className='btn btn-primary'>Rap</div>
                        </div>

                        <div className='col'>
                            <div className='btn btn-primary'>Country</div>
                        </div>

                        <div className='col'>
                            <div className='btn btn-primary'>Pop</div>
                        </div>

                        <div className='col'>
                            <div className='btn btn-primary'>Metal</div>
                        </div>

                        <div className='col'>
                            <div className='btn btn-primary'>Synthwave</div>
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

                        <div className='btn btn-danger'>Submit</div>
                    </div>
                </form>
            </div>
        )
    }
}
