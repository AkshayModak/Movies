import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style.css';
import Aux from '../../HOCs/Aux';
import Navbar from '../navbar';
import axios from '../../axios';
import Footer from '../footer';
import isoLangs from '../../utility/isoLangs';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PosterPlaceholder from '../../images/poster-placeholder.png';
import { Link } from 'react-router-dom';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

class MovieDetails extends Component {

		state = {
				credits: null,
				hasLoaded: false,
				movies: null,
				movie_id: null,
				movieTrailers: null,
				movieImages: null,
				photoIndex: 0,
				isOpen: false
		}

		componentWillMount() {
				document.body.style.background = 'black';
		}

		componentWillUnMount() {
				this.setState({
						movies: null,
						credits: null,
						isOpen: false
				});
		}


		componentDidMount() {
				if (this.props.location.state && !this.props.location.state.movie_id) {
						let link = '/3/movie/'+ this.props.location.state.posts.id +'?api_key=65324ba8898442570ac397a61cfa7f22&append_to_response=credits,videos,images';
            if (this.props.location.state.isTv) {
                link = '/3/tv/'+ this.props.location.state.posts.id +'?api_key=65324ba8898442570ac397a61cfa7f22&append_to_response=credits,videos,images';
            }
            if (this.props.match.params && this.props.match.params.tvid) {
                link = '/3/tv/'+ this.props.match.params.tvid +'?api_key=65324ba8898442570ac397a61cfa7f22&append_to_response=credits,videos,images';
            }
            axios.get(link)
                    .then( response => {
                        console.log('=====response.data====', response.data);
                        this.setState({
                            credits : response.data,
                            movieTrailers: response.data.videos,
                            movieImages: response.data.images
                        });
                    }).catch( error => {
                        console.log( error );
                    });
				}

				if (this.props.match.params && this.props.match.params.tvid) {
            const link = '/3/tv/'+ this.props.match.params.tvid +'?api_key=65324ba8898442570ac397a61cfa7f22&append_to_response=credits';
            axios.get(link)
            .then( response => {
                console.log('=====response.data====', response.data);
                this.setState({
                    credits : response.data,
                    movieTrailers: response.data.videos,
                    movieImages: response.data.images
                });
            }).catch( error => {
                console.log( error );
            });
        }

				if ((this.props.location.state && this.props.location.state.movie_id) || this.props.match.params.id) {
						let link = '/3/movie/'+ this.props.match.params.id +'?api_key=65324ba8898442570ac397a61cfa7f22&append_to_response=credits,videos,images';
						let movieId = this.props.match.params.id;
						if ((this.props.location.state && this.props.location.state.movie_id)) {
								link = '/3/movie/'+ this.props.location.state.movie_id +'?api_key=65324ba8898442570ac397a61cfa7f22&append_to_response=credits,videos,images';
								movieId = this.props.location.state.movie_id;
						}
            this.setState({hasLoaded: true});

            axios.get(link)
            .then( response => {
                console.log('=====response====', response);
                this.setState({
                    movies : response.data,
                    credits: response.data.credits,
                    movie_id : movieId,
                    movieTrailers: response.data.videos,
                    movieImages: response.data.images
                });
                this.props.fetchMovies({ posts: response.data, 'type': 'MOVIE_DETAILS' });
            }).catch( error => {
                console.log( error );
            });
        }
    }


		render() {
		    const { photoIndex, isOpen, movieImages, movieTrailers } = this.state;

				let movieDetail = null;
				let movieDetails = null;
				let castAndCrew = null;
				let image_lightBox = null;
				let displayImages = null;
				let displayMovieTrailers = null;

				if (this.props.location || this.state.movies) {
						movieDetail = (
                <div className="backdrop"> <i className="fa fa-spinner fa-spin fa-5x fa-fw" style={{ top: '50%', left: '50%', position: 'absolute' }}/> </div>
           );
            movieDetails = null;
						let genres = [];
						if (this.state.credits || this.state.movies) {

								if (!this.state.movie_id) {
										movieDetails =  this.state.credits;
								} else {
										movieDetails =  this.state.movies;
								}
                movieDetails.backdrop = '';
                movieDetails.poster = 'https://image.tmdb.org/t/p/w500/' + movieDetails.poster_path; //'https://image.tmdb.org/t/p/original/' + movieDetails.backdrop_path
                document.body.style.background = "url(https://image.tmdb.org/t/p/original/" + movieDetails.backdrop_path +")";
                document.body.style.height = '100%';
                document.body.style.backgroundAttachment = 'fixed';
                document.body.style.backgroundPosition = 'center';
                document.body.style.backgroundRepeat = 'no-repeat';
                document.body.style.backgroundSize = 'cover';

								let castAndCrewMap = null;
                if (!this.state.credits.cast) {
                    let castMap = this.state.credits.credits.cast;
                    castAndCrewMap = castMap.concat(this.state.credits.credits.crew);
                    this.state.credits.genres.map( genre => {
                        genres.push(' ' + genre.name);
                        return '';
                    });
                } else {
                    let castMap = this.state.credits.cast;
                    castAndCrewMap = castMap.concat(this.state.credits.crew);
                    this.state.movies.genres.map( genre => {
                        genres.push(' ' + genre.name);
                        return '';
                    });
                }

								let images = [];

								if (movieImages) {
										const backdrops = movieImages.backdrops;
                    const posters = movieImages.posters;

                    if (backdrops) {
                        for (let image in backdrops) {
                            images.push('https://image.tmdb.org/t/p/w780/' + backdrops[image].file_path);
                        }
                    }
                    if (posters) {
                        for (let image in posters) {
                            images.push('https://image.tmdb.org/t/p/w780/' + posters[image].file_path);
                        }
                    }
								}

								if (movieTrailers && movieTrailers.results) {
										displayMovieTrailers = ( movieTrailers.results.filter((i, index) => (index < 4)).map( (trailers, index) => {
                            return (
                                <div className="col-lg-3" key={index}>
                                    <iframe src={"https://www.youtube.com/embed/" + trailers.key} title={trailers.key} frameBorder="0" allow="autoplay; encrypted-media" style={{ maxWidth: '100%', maxHeight: '100%' }} allowFullScreen></iframe>
                                </div>
                            )
                        })
                    )
								}

                image_lightBox = (
                    <Aux>
                        <button className="btn btn-dark btn-lg btn-block" onClick={() => this.setState({ isOpen: true })}>
                          Show All
                        </button>

                        {isOpen && (
                          <Lightbox
                            mainSrc={images[photoIndex]}
                            nextSrc={images[(photoIndex + 1) % images.length]}
                            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                            onMovePrevRequest={() =>
                              this.setState({
                                photoIndex: (photoIndex + images.length - 1) % images.length,
                              })
                            }
                            onMoveNextRequest={() =>
                              this.setState({
                                photoIndex: (photoIndex + 1) % images.length,
                              })
                            }
                          />
                        )}
                    </Aux>
                )

								if (images) {
										displayImages = (images.filter((i, index) => (index < 4)).map( (displayImage, index) => {
                            return(
                              <div className="col-lg-3 padding-0" key={index}>
                                  <button className="btn btn-link" onClick={() => this.setState({ isOpen: true, photoIndex: index })} style={{ paddingRight: '0' }}>
                                    <img src={displayImage} className="img-thumbnail" style={{ maxWidth: '100%', maxHeight: '100%' }} alt={index}/>
                                  </button>
                              </div>
                            );
                        })
                    );
								}

								const movie_language = isoLangs[movieDetails.original_language];
                movieDetail = (
                    <Aux key={movieDetails.id}>
                        <br />
                        <div className="row">
                            <div className="col-lg-5">
                                <img className='img-thumbnail' src={movieDetails.poster} alt={movieDetails.title}/>
                            </div>
                            <div className="col-lg-7">
                                <h1>{ movieDetails.title } { movieDetails.title === movieDetails.original_title ? '' : '(' + movieDetails.original_title + ')'}</h1>
                                <ul className="list-inline">
                                  <li className="list-inline-item center-align" style={{ paddingRight: '20px' }}>
																		User Score:
                                  </li>
                                  <li className="list-inline-item center-align" style={{ width: '80px' }}>
																		<CircularProgressbar className="inverted" background percentage={ movieDetails.vote_average * 10 } text={ movieDetails.vote_average * 10 + '%'} />
                                  </li>
                                </ul>
                                <p><strong> {movieDetails.overview}</strong></p>
                                <p><strong>Genre:</strong> { genres.join(",") }</p>
                                <p><strong>Language:</strong> {movie_language.name} ({movie_language.nativeName})</p>
                                <p><strong>Original Title:</strong> {movieDetails.original_title}</p>
                                <p><strong>Overview:</strong> {movieDetails.overview}</p>
                                <p><strong>Popularity:</strong> {movieDetails.popularity}</p>
                                <p><strong>Poster Path:</strong> {movieDetails.poster_path}</p>
                                <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
                            </div>
                        </div>
                        <br />
                    </Aux>
                );

								let currentCast = 0;
								let casts = (castAndCrewMap.map( cast => {
										currentCast = currentCast + 1;
										if (currentCast < 7) {
												return (
														<div className="col-6 col-lg-2" key={cast.id + '-' + cast.character} style={{ paddingLeft: '0' }}>
																<Link to={{ pathname: '/person', state: { people_id: cast.id } }}>
		                                <figure className="figure">
		                                    <img src={cast.profile_path ? 'https://image.tmdb.org/t/p/w185/' + cast.profile_path : PosterPlaceholder} className="rounded"  alt={cast.name} style={{ width: '160px', height: '240px' }}/>
		                                    <figcaption className="figure-caption text-center" style={{ color: 'black' }}>
		                                        { cast.name }
		                                    </figcaption>
		                                    <figcaption className="figure-caption text-center" style={{ color: 'black' }}>
		                                        As: { cast.character }
		                                    </figcaption>
		                                </figure>
                                </Link>
		                        </div>
												)
										} else {
												return ''
										}
										})
                )

								currentCast = 0;
                let seeMoreCast = (castAndCrewMap.map( cast => {
                    currentCast = currentCast + 1;
                    if (currentCast > 6) {
                        return (
                            <div className="col-xs-12 col-lg-2" key={ cast.id + '-' + currentCast} style={{ paddingLeft: '0' }}>
                              <Link to={{ pathname: '/person', state: { people_id: cast.id } }}>
                                <figure className="figure">
                                    <img src={cast.profile_path ? 'https://image.tmdb.org/t/p/w185/' + cast.profile_path : PosterPlaceholder} className="rounded"  alt={cast.name} style={{ width: '160px', height: '240px' }}/>
                                    <figcaption className="figure-caption text-center" style={{ color: 'black' }}>
                                      { cast.name }
                                    </figcaption>
                                    <figcaption className="figure-caption text-center" style={{ color: 'black' }}>
                                        { cast.character ? 'As: ' + cast.character : cast.department}
                                    </figcaption>
                                </figure>
                              </Link>
                            </div>
                        )
                    } else {
                        return ''
                    }
                  })
                )

                if (castAndCrewMap.length === 0) {
										casts = (
                        <div className="col padding-10">
														Cast Not Available
                        </div>
                    )
                }

                castAndCrew = (
										<div className="row" style={{marginLeft: '5%', marginRight: '5%'}}>
                        <div className="col">
                          <div className="col padding-10">
                            <a href="#demo" className="btn btn-dark btn-lg btn-block" data-toggle="collapse">{ seeMoreCast.length !== 0 ? 'See More' : ''}</a>
                          </div>
                          <div className="row">
															{ casts }
													</div>
													<div id="demo" className="collapse">
														<div className="row">
                                { seeMoreCast }
                            </div>
                          </div>
                        </div>
                    </div>
                );
						}
				}
				return (
							<Aux>
								<Navbar />
								<div className="container" style={ this.props.location || this.state.movies ? {"boxShadow": "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)", opacity: '.95', marginTop: '55px', height: '100%'} : { height: '100%' } }>
									<div>{movieDetail}</div>

									<ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" id="home-tab" data-toggle="tab" href="#castandcrew" role="tab" aria-controls="castandcrew" aria-selected="true">Cast & Crew</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="profile-tab" data-toggle="tab" href="#images" role="tab" aria-controls="images" aria-selected="false">Images <span className="badge badge-dark">{this.state.movieImages ? this.state.movieImages.length : ''}</span></a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="contact-tab" data-toggle="tab" href="#trailers" role="tab" aria-controls="trailers" aria-selected="false">Trailers <span className="badge badge-dark">{this.state.movieTrailers ? this.state.movieTrailers.results.length : ''}</span></a>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="castandcrew" role="tabpanel" aria-labelledby="home-tab">
                      {castAndCrew}
                    </div>
                    <div className="tab-pane fade" id="images" role="tabpanel" aria-labelledby="profile-tab">
                        {image_lightBox}
                        <div className="row">
                          {displayImages}
                        </div>
                    </div>
                    <div className="tab-pane fade" id="trailers" role="tabpanel" aria-labelledby="contact-tab">
                      <div className="row">
                        {displayMovieTrailers}
                      </div>
                    </div>
                  </div>
								</div>
								<Footer />
							</Aux>
				)
		}
}

const mapDispatchToProps = dispatch => {
    return {
        fetchMovies : (data) => dispatch(data)
    }
};

export default connect(null, mapDispatchToProps)(MovieDetails);