import React from 'react'

import { Link } from 'react-router-dom'

const Navigation = () => (
   
                <nav className="navbar navbar-expand-lg bg-secondary text-uppercase     fixed-top" id="mainNav">
                    <div className="container">
                      
                      <Link to="/">Home</Link>
                      
                      <button className="navbar-toggler navbar-toggler-right        text-uppercase font-weight-bold bg-primary text-white   rounded" type="button" data-toggle="collapse"        data-target="#navbarResponsive"     aria-controls="navbarResponsive" aria-expanded="false"        aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars"></i>
                      </button>

                      <div className="collapse navbar-collapse"     id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">

                        <li className="nav-item mx-0 mx-lg-1">
                            <Link to="/About">About</Link>
                          </li>
                          
                          <li className="nav-item mx-0 mx-lg-1">
                            <Link to="/Profile">Profile</Link>
                          </li>
                          
                          <li className="nav-item mx-0 mx-lg-1">
                            <Link to="/Event">Event</Link>
                          </li>
                          
                        </ul>
                      </div>
                    </div>
                </nav>
            
)

export default Navigation
