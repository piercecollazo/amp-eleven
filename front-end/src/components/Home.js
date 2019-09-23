import React, { Component } from 'react'

import BackgroundVideo from '../Assets/video/Amp.mp4'

export default class Home extends Component {
    render() {
        return (
            <div>
                <video autoplay='autoplay' muted='muted' loop='loop' id="backgroundVideo">    
                    <source src={BackgroundVideo} type="video/mp4" />
                </video>
                    <header className="masthead">
                        <div className="container d-flex h-100 align-items-center">
                          <div className="mx-auto text-center">
                            <h1 className="mx-auto my-0 text-uppercase">Amp-Eleven</h1>
                            <h2 className="text-black-50 mx-auto mt-2 mb-5">Welcome to Amp-Eleven. From the undergroundto the          stage</h2>
                            <a href="#about" className="btn btn-primary js-scroll-trigger">Get          Started</a>
                          </div>
                        </div>
                    </header>
            </div>
        )
    }
}

