import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './style.css';
import PosterPlaceholder from '../images/poster-placeholder.png';
import Aux from '../HOCs/Aux';

class OuterNavbar extends Component {

		state = {
				movies : []
		};

		componentWillReceiveProps(nextProps) {
				this.setState({
            movies: nextProps.movies.results
        });
		}

		render() {
				let movieBar = <div className="loader"></div>;
				if (this.state.movies) {
						if (this.state.movies.length > 5) {
                let moviesList = this.state.movies;
                moviesList.reverse();
                let moviePosters = 0;
                let movieList = [];
                moviesList.map( movie => {
										if (movie.backdrop_path && moviePosters < 5) {
												movieList.push(movie);
												moviePosters++;
										}
                });
                if (moviesList) {
                    movieBar = (
                        movieList.map( movie => {
                            movie.backdrop = 'https://image.tmdb.org/t/p/w300/' + movie.backdrop_path; //'https://image.tmdb.org/t/p/original/' + movieDetails.backdrop_path
                            return (
                                <div className='col col-lg padding-0' key={movie.id}>
                                  <img src={movie.backdrop} alt={movie.title} title={movie.title} className='width-100'/>
                                </div>
                            )
                        })
                    )
                }
            }
				}

				return (
						<Aux>
							<div className="row margin-0">
								{movieBar}
							</div>
							<nav className="navbar navbar-expand-lg navbar-light bg-light">
	              <NavLink className="navbar-brand" to="/" exact style={{ color: 'white' }}>Movie Cosmos</NavLink>
	              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
	                <span className="navbar-toggler-icon"></span>
	              </button>
	              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
	                <div className="navbar-nav">
	                  <NavLink to="/" exact className="nav-item nav-link" activeStyle={{ color: 'red'}} style={{ color: 'white' }}>
	                    Home
	                  </NavLink>
	                  <NavLink to="/discover" className="nav-item nav-link" exact activeStyle={{ color: 'red' }} style={{ color: 'white' }}>
	                        TV
	                  </NavLink>
	                  <NavLink to="/discover" className="nav-item nav-link" exact activeStyle={{ color: 'red' }} style={{ color: 'white' }}>
	                        Movies
	                  </NavLink>
                    <NavLink to="/discover" className="nav-item nav-link" exact activeStyle={{ color: 'red' }} style={{ color: 'white' }}>
                          Actors
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

export default connect(mapStateToProps)(OuterNavbar);