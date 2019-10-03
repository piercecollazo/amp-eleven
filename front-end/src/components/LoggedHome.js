import React, { Component } from 'react'
import Context from '../context/Context'
import {Link} from 'react-router-dom'

import slayer from '../Assets/images/slayer.jpg'
import megadeth from '../Assets/images/megadeth.png'
import metallica from '../Assets/images/metallica.jpeg'
import spinaltap from '../Assets/images/spinal-tap.jpeg'
import concert1 from '../Assets/images/concert-1.jpg'
import concert2 from '../Assets/images/concert-2.jpeg'
import band1 from '../Assets/images/band-1.jpg'

export default class LoggedHome extends Component {
    static contextType = Context

    constructor(props){
        super(props)

        this.state = {
            search:'',
            recommended: [],
            newCreators: []
        }
    }

    render() {
        return (
            <div className='container logged-home'>
                {/* Top row */}
                <div className='row'>
                    <div className='col text-white'>
                        <h5>Underground spotlight</h5>
                    </div>

                    <div className='col text-white'>
                        <form>
                            <div className='input-group'>
                                <input className='form-control' placeholder='Search' />

                                <div className='input-group-append'>
                                    <div className='btn btn-success search-button'>
                                        <i className="material-icons search-icon">search</i>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className='col text-white'>
                        <h5>You may be interested in</h5>
                    </div>
                </div>
                
                {/* mid content area */}

                <div className='row'>
                    <div className='col'>
                        <ul>
                            <li>
                              <Link to={`/profile`}><img className="avatar mx-auto img-fluid" src={slayer} alt=''></img></Link>
                              <span> Slayer</span>
                            </li>

                            <li>
                              <Link to={`/profile`}><img className="avatar mx-auto img-fluid" src={metallica} alt=''></img></   Link>
                              <span> Metallica</span>
                            </li>
                        </ul>
                    </div>

                    <div className='col text-white'>
                        <ul>
                            <li>
                                <img className='news-img' src={concert1} alt='' />
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed vulputate odio ut enim. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Dolor sit amet consectetur adipiscing elit ut aliquam. Hendrerit dolor magna eget est lorem ipsum dolor sit amet. Ornare quam viverra orci sagittis eu volutpat. Posuere ac ut consequat semper viverra nam libero. Enim blandit volutpat maecenas volutpat blandit. Magna sit amet purus gravida quis blandit. Condimentum vitae sapien pellentesque habitant. Turpis nunc eget lorem dolor sed.</p>
                            </li>
                            <hr />
                            <li>
                                <img className='news-img' src={concert2} alt='' />
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed vulputate odio ut enim. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Dolor sit amet consectetur adipiscing elit ut aliquam. Hendrerit dolor magna eget est lorem ipsum dolor sit amet. Ornare quam viverra orci sagittis eu volutpat. Posuere ac ut consequat semper viverra nam libero. Enim blandit volutpat maecenas volutpat blandit. Magna sit amet purus gravida quis blandit. Condimentum vitae sapien pellentesque habitant. Turpis nunc eget lorem dolor sed.</p>
                            </li>
                            <hr />
                            <li>
                                <img className='news-img' src={band1} alt='' />
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed vulputate odio ut enim. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Dolor sit amet consectetur adipiscing elit ut aliquam. Hendrerit dolor magna eget est lorem ipsum dolor sit amet. Ornare quam viverra orci sagittis eu volutpat. Posuere ac ut consequat semper viverra nam libero. Enim blandit volutpat maecenas volutpat blandit. Magna sit amet purus gravida quis blandit. Condimentum vitae sapien pellentesque habitant. Turpis nunc eget lorem dolor sed.</p>
                            </li>
                            <hr />
                        </ul>
                    </div>

                    <div className='col'>
                        <ul>
                        <li>
                              <Link to={`/profile`}><img className="avatar mx-auto img-fluid" src={megadeth} alt=''></img></    Link>
                              <span> Megadeth</span>
                            </li>

                            <li>
                              <Link to={`/profile`}><img className="avatar mx-auto img-fluid" src={spinaltap} alt=''></img></   Link>
                              <span> Spinal Tap</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        )
    }
}
