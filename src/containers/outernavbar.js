import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';
import Aux from '../HOCs/Aux';
import AppleCarousel from 'react-apple-carousel';
import Loader from '../utility/loader';
import { Link } from 'react-router-dom';

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
                    const firstSlide = movieList[0];
                    const secondSlide = movieList[1];
                    const thirdSlide = movieList[2];
                    const fourthSlide = movieList[3];
                    const backdrop_image0 = {backgroundImage: 'url(https://image.tmdb.org/t/p/w1280/' + firstSlide.backdrop_path + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}
                    const backdrop_image1 = {backgroundImage: 'url(https://image.tmdb.org/t/p/w1280/' + secondSlide.backdrop_path + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}
                    const backdrop_image2 = {backgroundImage: 'url(https://image.tmdb.org/t/p/w1280/' + thirdSlide.backdrop_path + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}
                    const backdrop_image3 = {backgroundImage: 'url(https://image.tmdb.org/t/p/w1280/' + fourthSlide.backdrop_path + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}
                    movieBar = (
                        <AppleCarousel enableTimer={false}
                          renderSlides={[
                            ({ activeItemIndex, index }) => <div style={{ height: '600px' }}>
                                  <div className="img-cover" style={backdrop_image0}>
                                      <div className="layer">
																				<div className="col-12 col-md-6 front-labels">
                                            <h1>{firstSlide.title}</h1>
																						<p>{firstSlide.overview}</p>
																						<Link className="btn btn-danger" to={"/movie-details/" + firstSlide.id}>More Details</Link>
                                        </div>
                                      </div>
                                  </div>
                            </div>,
                            ({ slide }) => <div animationvalue={slide} style={{ height: '100%' }}>
                                  <div className="img-cover" style={backdrop_image1}/>
                                  <div className="layer">
                                    <div className="col-12 col-md-6 front-labels">
																			<h1>{secondSlide.title}</h1>
                                      <p>{secondSlide.overview}</p>
                                      <Link className="btn btn-danger" to={"/movie-details/" + secondSlide.id}>More Details</Link>
                                    </div>
                                  </div>
                            </div>,
                            () => <div style={{ height: '100%' }}>
                                    <div className="img-cover" style={backdrop_image2}>
		                                    <div className="layer">
                                            <div className="col-12 col-md-6 front-labels">
                                              <h1>{thirdSlide.title}</h1>
                                              <p>{thirdSlide.overview}</p>
                                              <Link className="btn btn-danger" to={"/movie-details/" + thirdSlide.id}>More Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                  </div>,
                            () => <div  style={{ height: '100%' }}>
                                    <div className="img-cover" style={backdrop_image3}/>
                                    <div className="layer">
                                      <div className="col-12 col-md-6 front-labels">
                                        <h1>{fourthSlide.title}</h1>
                                        <p>{fourthSlide.overview}</p>
                                        <Link className="btn btn-danger" to={"/movie-details/" + fourthSlide.id}>More Details</Link>
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