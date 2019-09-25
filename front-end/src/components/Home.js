import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BackgroundVideo from '../Assets/video/Amp.mp4'

export default class Home extends Component {
    render() {
        return (

            
                <div id="pre-auth">
                    <video autoPlay='autoplay' muted='muted' loop='loop'    id="backgroundVideo">    
                        <source src={BackgroundVideo} type="video/mp4" />
                    </video>
                        <header className="masthead">
                            <div className="container d-flex h-100  align-items-center">
                              <div className="mx-auto text-center">
                                <h1 className="mx-auto text-white my-0  text-uppercase">Amp-Eleven</h1>
                                <h2 className="text-white mx-auto mt-2 mb-5">Welcome    to Amp-Eleven. From the underground to the             stage</h2>
                                <Link to="/signup" className="btn btn-primary js-scroll-trigger">Join us!</Link>
                              </div>
                            </div>
                        </header>
                </div>
            
        )
    }
}

