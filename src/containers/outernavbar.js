import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.css';
import Aux from '../HOCs/Aux';
import AppleCarousel from 'react-apple-carousel';

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
				let movieBar = (
             <div style={{ width: '100%', height: '600px' }}> <i className="fa fa-spinner fa-spin fa-5x fa-fw" style={{ color: 'white', marginLeft: '50%', position: 'relative', top: '50%'}}/> </div>
        );
				if (this.state.movies) {
						if (this.state.movies.length > 5) {
                let moviesList = this.state.movies;
                let moviePosters = 0;
                let movieList = [];
                moviesList.map( movie => {
										if (movie.backdrop_path && moviePosters < 5) {
												movieList.push(movie);
												moviePosters++;
										}
										return '';
                });
                if (moviesList) {
                    const backdrop_image0 = {backgroundImage: 'url(https://image.tmdb.org/t/p/w1280/' + movieList[0].backdrop_path + ')', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}
                    const backdrop_image1 = {backgroundImage: 'url(https://image.tmdb.org/t/p/w1280/' + movieList[1].backdrop_path + ')', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}
                    const backdrop_image2 = {backgroundImage: 'url(https://image.tmdb.org/t/p/w1280/' + movieList[2].backdrop_path + ')', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}
                    const backdrop_image3 = {backgroundImage: 'url(https://image.tmdb.org/t/p/w1280/' + movieList[3].backdrop_path + ')', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}
                    movieBar = (
                        <AppleCarousel
                          renderSlides={[
                            ({ activeItemIndex, index }) => <div style={{ height: '600px' }}>
                                  <div className="img-cover" style={backdrop_image0}>
                                      <div className="layer">
																				<div className="front-labels">
                                            <h1>Welcome to Movie Cosmos!</h1>
                                            <h3>Here you can search for details regarding all the movies.</h3>
                                        </div>
                                      </div>
                                  </div>
                            </div>,
                            ({ slide }) => <div animationvalue={slide} style={{ height: '100%' }}>
                                  <div className="img-cover" style={backdrop_image1}/>
                                  <div className="layer">
                                    <div className="front-labels">
																				<h1>Upcoming Movies</h1>
                                    </div>
                                  </div>
                            </div>,
                            () => <div style={{ height: '100%' }}>
                                    <div className="img-cover" style={backdrop_image2}>
		                                    <div className="layer">
                                            <div className="front-labels">
                                                <h1>Trending Movies</h1>
                                            </div>
                                        </div>
                                    </div>
                                  </div>,
                            () => <div  style={{ height: '100%' }}>
                                    <div className="img-cover" style={backdrop_image3}/>
                                    <div className="layer">
                                      <div className="front-labels">
                                          <h1>In Theatres Movies</h1>
                                      </div>
                                    </div>
                                </div>,
                          ]}
                        />
                    )
                }
            }
				}

				return (
						<Aux>
							<nav className="navbar navbar-expand-lg fixed-top navbar-dark" style={{ padding: '0', backgroundColor: 'black' }}>
	              <NavLink className="navbar-brand" to="/" exact style={{ color: 'white', padding: '10px' }}>Movie Cosmos</NavLink>
	              <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
	                <span className="navbar-toggler-icon"></span>
	              </button>
	              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
	                <div className="navbar-nav" style={{ padding: '10px' }}>
	                  <NavLink to="/" exact className="nav-item nav-link" activeStyle={{ color: 'red'}} style={{ color: 'white' }}>
	                    Home
	                  </NavLink>
	                  <li className="nav-item dropdown">
	                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: 'white' }}>
	                      Television
	                    </a>
	                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
	                      <Link className="dropdown-item" to="/television/popular">Popular</Link>
	                      <Link className="dropdown-item" to="/television/top-rated">Top Rated</Link>
	                      <Link className="dropdown-item" to="/television/airing-today">Airing Today</Link>
	                      <Link className="dropdown-item" to="/television/on-air">On Air</Link>
	                    </div>
	                  </li>
	                  <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: 'white' }}>
                        Movies
                      </a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to="/movies/upcoming">Upcoming</Link>
                        <Link className="dropdown-item" to="/movies/in-theatres">In Theatres</Link>
                        <Link className="dropdown-item" to="/movies/top-rated">Top Rated</Link>
                        <Link className="dropdown-item" to="/movies/popular">Popular</Link>
                      </div>
                    </li>
                    <NavLink to="/actors" className="nav-item nav-link" exact activeStyle={{ color: 'red' }} style={{ color: 'white' }}>
                          Actors
                    </NavLink>
	                </div>
	              </div>
	            </nav>
	            <div className="row margin-0">
              								{movieBar}
              							</div>
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