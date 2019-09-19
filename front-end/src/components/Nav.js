import React from 'react'

import { Link } from 'react-router-dom'

const Navigation = () => (
   
                <nav class="navbar navbar-expand-lg bg-secondary text-uppercase     fixed-top" id="mainNav">
                    <div class="container">
                      
                      <Link to="/">Home</Link>
                      
                      <button class="navbar-toggler navbar-toggler-right        text-uppercase font-weight-bold bg-primary text-white   rounded" type="button" data-toggle="collapse"        data-target="#navbarResponsive"     aria-controls="navbarResponsive" aria-expanded="false"        aria-label="Toggle navigation">
                        Menu
                        <i class="fas fa-bars"></i>
                      </button>

                      <div class="collapse navbar-collapse"     id="navbarResponsive">
                        <ul class="navbar-nav ml-auto">

                        <li class="nav-item mx-0 mx-lg-1">
                            <Link to="/About">About</Link>
                          </li>
                          
                          <li class="nav-item mx-0 mx-lg-1">
                            <Link to="/Profile">Profile</Link>
                          </li>
                          
                          <li class="nav-item mx-0 mx-lg-1">
                            <Link to="/Event">Event</Link>
                          </li>
                          
                        </ul>
                      </div>
                    </div>
                </nav>
            
)

export default Navigation
