import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.css';
import Aux from '../HOCs/Aux';
import AppleCarousel from 'react-apple-carousel';
import Navbar from './navbar';

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
							<Navbar />
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