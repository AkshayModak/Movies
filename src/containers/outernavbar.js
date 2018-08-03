import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';
import Aux from '../HOCs/Aux';
import AppleCarousel from 'react-apple-carousel';
import Loader from '../utility/loader';

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
             <Loader />
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
                        <AppleCarousel enableTimer={false}
                          renderSlides={[
                            ({ activeItemIndex, index }) => <div style={{ height: '600px' }}>
                                  <div className="img-cover" style={backdrop_image0}>
                                      <div className="layer">
																				<div className="front-labels">
                                            <h1></h1>
                                            <h3></h3>
                                        </div>
                                      </div>
                                  </div>
                            </div>,
                            ({ slide }) => <div animationvalue={slide} style={{ height: '100%' }}>
                                  <div className="img-cover" style={backdrop_image1}/>
                                  <div className="layer">
                                    <div className="front-labels">
																				<h1></h1>
                                    </div>
                                  </div>
                            </div>,
                            () => <div style={{ height: '100%' }}>
                                    <div className="img-cover" style={backdrop_image2}>
		                                    <div className="layer">
                                            <div className="front-labels">
                                                <h1></h1>
                                            </div>
                                        </div>
                                    </div>
                                  </div>,
                            () => <div  style={{ height: '100%' }}>
                                    <div className="img-cover" style={backdrop_image3}/>
                                    <div className="layer">
                                      <div className="front-labels">
                                          <h1></h1>
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
	            <div className="row margin-0" style={{ marginTop: '100px' }}>
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