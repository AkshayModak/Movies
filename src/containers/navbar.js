import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './style.css';
import PosterPlaceholder from '../images/poster-placeholder.png';
import Aux from '../HOCs/Aux';

class Navbar extends Component {

		state = {
				movies : []
		};

		componentWillReceiveProps(nextProps) {
				this.setState({
            movies: nextProps.movies
        });
		}

		render() {
				let movieBar = <div className="loader"></div>;
				console.log('====this.state 1====', this.state);
				if (this.state.movies) {
						if (this.state.movies.backdrop_path) {
								let movie = this.state.movies;
                movie.backdrop = 'https://image.tmdb.org/t/p/w1280/' + movie.backdrop_path; //'https://image.tmdb.org/t/p/original/' + movieDetails.backdrop_path
                var parallax = {
                    backgroundImage: 'url(' + movie.backdrop + ')',

                    /* Set a specific height */
                    height: '0',

                    /* Create the parallax scrolling effect */
                    backgroundAttachment: 'fixed',
                    backgroundPosition: 'center bottom',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    top: '-50%'

                }

                movieBar = (
                    <div className='col col-lg padding-0' key={movie.id}>
                      <div style={parallax}></div>
                    </div>
                )
						} else {
								var parallax = {
                    backgroundImage: 'url('+ PosterPlaceholder +')',

                    /* Set a specific height */
                    height: '200px',

                    /* Create the parallax scrolling effect */
                    backgroundAttachment: 'fixed',
                    backgroundPosition: 'center bottom',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    top: '-50%'

                }

                movieBar = (
                    <div className='col col-lg padding-0'>
                      <div style={parallax}></div>
                    </div>
                )
						}
				}
				return (
						<Aux>
							<div className="row margin-0">
								{movieBar}
							</div>
							<nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
	              <NavLink className="navbar-brand" to="/" exact style={{ color: 'white' }}>Movie Cosmos</NavLink>
	              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
	                <span className="navbar-toggler-icon"></span>
	              </button>
	              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
	                <div className="navbar-nav">
	                  <NavLink to="/" exact className="nav-item nav-link" activeStyle={{ color: '#fa923f', textDecoration: 'underline'}} style={{ color: 'white' }}>
	                    Home
	                  </NavLink>
	                  <NavLink to="/discover" className="nav-item nav-link" exact activeStyle={{ color: '#fa923f', textDecoration: 'underline'}} style={{ color: 'white' }}>
	                        Discover
	                  </NavLink>
	                </div>
	              </div>
	            </nav>
            </Aux>
				);
		}
}

const mapStateToProps = state => {
		return {
				movies : state.posts
		};
}

export default connect(mapStateToProps)(Navbar);