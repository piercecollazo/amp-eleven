import React from 'react'
import BackgroundVideo from '../Assets/video/Amp.mp4'

const Home = () => (
    <div>
            <header className="masthead">
                <div className="container d-flex h-100 align-items-center">
                  <div className="mx-auto text-center">
                    <h1 className="mx-auto my-0 text-uppercase">Grayscale</h1>
                    <h2 className="text-black-50 mx-auto mt-2 mb-5">A free, responsive, one             page Bootstrap theme created by Start Bootstrap.</h2>
                    <a href="#about" className="btn btn-primary js-scroll-trigger">Get          Started</a>
                  </div>
                </div>
                {/* <video autoplay muted loop id="backgroundVideo">    
                    <source src={BackgroundVideo} type="video/mp4" />
                </video> */}
            </header>
        </div>
        )

export default Home
