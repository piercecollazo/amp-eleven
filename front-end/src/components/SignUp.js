import React, { Component } from 'react'
import Context from '../context/Context'

export default class SignUp extends Component {
    static contextType = Context

    constructor(props){
        super(props)

        this.state={
            email: '',
            pass: '',
            username: '',
            passConfirm: '',
            creator: false
        }
    }

    stateUpdate = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
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

    handleSubmit = (event)=>{
        event.preventDefault()

        this.context.signUp(this.state)
    }

    render() {
        return (
            <div className="container signup">
                  <div className="row">
                    <div className="col-lg-10 col-xl-9 mx-auto">
                      <div className="card card-signin flex-row my-5">
                        <div className="card-img-left d-none d-md-flex">
                        </div>

                        <div className="card-body">
                          <h5 className="card-title text-center">Register</h5>
                          <form className="form-signin" onSubmit={this.handleSubmit}>
                            <div className="form-label-group">
                              <input type="text" id="inputUserame" className="form-control"             placeholder="Username" required autoFocus onChange={this.stateUpdate} name='username' />
                              <label htmlFor="inputUserame">Username</label>
                        </div>

                            <div className="form-label-group">
                              <input type="email" id="inputEmail" className="form-control"              placeholder="Email address" required onChange={this.stateUpdate} name='email'/>
                              <label htmlFor="inputEmail">Email address</label>
                            </div>

                            <div className="form-label-group">
                              <input type="password" id="inputPassword" className="form-control"            placeholder="Password" required onChange={this.stateUpdate} name='pass'/>
                              <label htmlFor="inputPassword">Password</label>
                            </div>

                            <div className="form-label-group">
                              <input type="password" id="inputConfirmPassword" className="form-control" placeholder="Password" required onChange={this.stateUpdate} name='passConfirm'/>
                              <label htmlFor="inputConfirmPassword">Confirm password</label>
                            </div>

                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" />
                                <label className="form-check-label" htmlFor="dropdownCheck" onClick={this.creatorCheck}>Are you a content creator?</label>
                            </div>

                            <hr />


                            <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        )
    }
}
