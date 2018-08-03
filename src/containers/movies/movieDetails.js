import React from 'react';
import Aux from '../../HOCs/Aux';
import '../style.css';
import axios from '../../axios';
import Footer from '../footer';
import 'react-circular-progressbar/dist/styles.css';
import PosterPlaceholder from '../../images/poster-placeholder.png';
import { Link } from 'react-router-dom';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import { dateFormatter } from '../../utility/utilityMethods';
import Loader from '../../utility/loader';

class MovieDetails extends React.Component {

		state = {
        credits: null,
        hasLoaded: false,
        movies: null,
        movie_id: null,
        movieTrailers: null,
        movieImages: null,
        photoIndex: 0,
        isOpen: false,
        similarMovies: null
    }

		componentWillReceiveProps(newProps) {
				this.props = newProps;
				this.setState({ movies: null });
				this.componentDidMount();
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
                        this.setState({
                            credits : response.data,
                            movieTrailers: response.data.videos,
                            movieImages: response.data.images
                        });
                    }).catch( error => {
                        console.log( error );
                        this.props.history.push("/");
                    });
        }

        if (this.props.match.params && this.props.match.params.tvid) {
            const link = '/3/tv/'+ this.props.match.params.tvid +'?api_key=65324ba8898442570ac397a61cfa7f22&append_to_response=credits';
            axios.get(link)
            .then( response => {
                this.setState({
                    credits : response.data,
                    movieTrailers: response.data.videos,
                    movieImages: response.data.images
                });
            }).catch( error => {
                console.log( error );
                this.props.history.push("/");
            });
        }

        if ((this.props.location.state && this.props.location.state.movie_id) || this.props.match.params.id) {
            let link = '/3/movie/'+ this.props.match.params.id +'?api_key=65324ba8898442570ac397a61cfa7f22&append_to_response=credits,videos,images,similar';
            let movieId = this.props.match.params.id;
            if ((this.props.location.state && this.props.location.state.movie_id)) {
                link = '/3/movie/'+ this.props.location.state.movie_id +'?api_key=65324ba8898442570ac397a61cfa7f22&append_to_response=credits,videos,images,similar';
                movieId = this.props.location.state.movie_id;
            }
            this.setState({hasLoaded: true});

            axios.get(link)
            .then( response => {
                this.setState({
                    movies : response.data,
                    credits: response.data.credits,
                    movie_id : movieId,
                    movieTrailers: response.data.videos,
                    movieImages: response.data.images,
                    similarMovies: response.data.similar
                });
            }).catch( error => {
                console.log( error );
                this.props.history.push("/");
            });
        }
    }

    componentWillUnmount() {
        this.setState({ movies: null });
    }

		render() {
				const { photoIndex, isOpen, movieImages, movieTrailers } = this.state;

	      let movieDetail = null;
	      let movieDetails = null;
	      let image_lightBox = null;
	      let displayImages = null;
	      let displayMovieTrailers = null;

				movieDetail = (
            <Loader />
        );

	      if (this.props.location || this.state.movies) {
            movieDetails = null;
            let genres = [];
            if (this.state.credits || this.state.movies) {

                if (!this.state.movie_id) {
                    movieDetails =  this.state.credits;
                } else {
                    movieDetails =  this.state.movies;
                }

								if (movieDetails) {
										document.title = movieDetails.title + ' - Nextrr';
										let castAndCrewMap = null;
                    if (!this.state.credits.cast) {
                        let castMap = this.state.credits.credits.cast;
                        castAndCrewMap = castMap.concat(this.state.credits.credits.crew);
                        this.state.credits.genres.map( genre => {
                            genres.push(' ' + genre.name);
                            return '';
                        });
                    } else if ( this.state.movies && this.state.movies.genres ) {
                        let castMap = this.state.credits.cast;
                        castAndCrewMap = castMap.concat(this.state.credits.crew);
                        this.state.movies.genres.map( genre => {
                            genres.push(' ' + genre.name);
                            return '';
                        });
                    }

                    const genreTags = genres.map( genre => {
                        return (
                            <li key={genre} className="list-inline-item"><span className="badge badge-danger">{genre}</span></li>
                        )
                    });

                    let director = 'N/A';
                    let writers = [];
                    let runTime = 'N/A';

                    if (movieDetails && movieDetails.runtime) {
                        runTime = movieDetails.runtime;
                    }

                    if ('N/A' !== runTime) {
                        runTime = runTime + ' minutes';
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
                        displayMovieTrailers = ( movieTrailers.results.map( (trailers, index) => {
                                return (
                                    <div className="col-lg-12" key={index}>
                                        <iframe src={"https://www.youtube.com/embed/" + trailers.key} title={trailers.key} frameBorder="0" allow="autoplay; encrypted-media" style={{ maxWidth: '100%', maxHeight: '100%' }} allowFullScreen></iframe>
                                    </div>
                                )
                            })
                        )
                    }

										let displayMovieTrailersOnOverview = null;
                    if (movieTrailers && movieTrailers.results) {
                        displayMovieTrailersOnOverview = ( movieTrailers.results.filter((i, index) => (index < 3)).map( (trailers, index) => {
                                return (
                                    <div className="col-lg-12" key={index}>
                                        <iframe src={"https://www.youtube.com/embed/" + trailers.key} title={trailers.key} frameBorder="0" allow="autoplay; encrypted-media" style={{ maxWidth: '100%', maxHeight: '100%' }} allowFullScreen></iframe>
                                    </div>
                                )
                            })
                        )
                    }

                    image_lightBox = (
                        <Aux>
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
                        displayImages = (images.map( (displayImage, index) => { //(images.filter((i, index) => (index < 4)).map( (displayImage, index) => {
                                return(
                                  <div className="col-lg-6 padding-0" key={index}>
                                      <button className="btn btn-link" onClick={() => this.setState({ isOpen: true, photoIndex: index })}>
                                        <img src={displayImage} className="img-thumbnail" alt={index}/>
                                      </button>
                                  </div>
                                );
                            })
                        );
                    }

                    let similarMovies = 'Not Available';
                    if (this.state.similarMovies) {
                        similarMovies = this.state.similarMovies.results.map( similarMovie => {
                            return (
                                <div className="col-xs" key={similarMovie.id}>
                                    <Link to={'/movie-details/'+similarMovie.id} className="no-decoration">
                                        <li>
                                          <dl className="row cast">
                                            <dt className="col-xs-4"><img src={ similarMovie.poster_path ? "https://image.tmdb.org/t/p/w185/" + similarMovie.poster_path : PosterPlaceholder} alt={similarMovie.title} className="card-img-top"/></dt>
                                            <dd className="col-xs-8">{similarMovie.title}</dd>
                                          </dl>
                                        </li>
                                    </Link>
                                </div>
                            )
                        });
                    }

                    let currentCast = 0;
                    let casts = null;
                    let allCast = null;
                    if (castAndCrewMap) {
                        castAndCrewMap.map( castAndCrew => {
                            if (castAndCrew.job && 'Director' === castAndCrew.job) {
                                director = castAndCrew.name;
                            }
                            if (castAndCrew.job && 'Writer' === castAndCrew.job) {
                                writers.push(' ' + castAndCrew.name);
                            }
                            return '';
                        });

                        casts = (castAndCrewMap.map( cast => {
                            currentCast = currentCast + 1;
                            if (currentCast < 5) {
                                return (
                                        <li key={cast.id}>
                                          <Link to={'/person/' + cast.id } className="no-decoration" key={cast.id + '-' + cast.character} >
                                              <dl className="row cast">
                                                <dt className="col-xs-4"><img src={ cast.profile_path ? "https://image.tmdb.org/t/p/w185/" + cast.profile_path : PosterPlaceholder} alt={cast.name} className="card-img-top"/></dt>
                                                <dd className="col-xs-8">{cast.name}</dd>
                                              </dl>
                                          </Link>
                                        </li>
                                )
                            } else {
                                return ''
                            }
                            })
                        )

                        currentCast = 0;
                        allCast = (castAndCrewMap.map( cast => {
                            return (
                                <li key={cast.id + '-' + cast.job}>
                                    <Link to={'/person/' + cast.id } className="no-decoration">
                                      <dl className="row cast">
                                        <dt className="col-xs-4"><img src={ cast.profile_path ? "https://image.tmdb.org/t/p/w185/" + cast.profile_path : PosterPlaceholder} alt={cast.name} className="card-img-top"/></dt>
                                        <dd className="col-xs-8">{cast.name}</dd>
                                      </dl>
                                    </Link>
                                </li>
                            )

                          })
                        )
                    }

                    if (!castAndCrewMap || castAndCrewMap.length === 0) {
                        casts = (
                            <div className="col padding-10">
                                Cast Not Available
                            </div>
                        )
                    }

                    const backdrop_path = 'https://image.tmdb.org/t/p/w780/' + movieDetails.backdrop_path;
                    const poster_path = 'https://image.tmdb.org/t/p/w342/' + movieDetails.poster_path;
                    movieDetail = (
                        <Aux key={movieDetails.id}>
                          <div className="movie-banner" style={{backgroundImage: 'url(' + backdrop_path + ')' }}></div>
                          <div className="movie_single">
                            <div className="container">
                              <div className="movie-single">
                                <div className="row">
                                  <div className="col-xs col-lg-4">
                                    <img src={poster_path} className="sticky-top poster" alt={movieDetails.title}/>
                                  </div>
                                  <div className="col-lg-8 primary-bar">
                                    <h3>{movieDetails.title}</h3>
                                    <nav className="nav movie-tabs">
                                      <a className="nav-link active" id="overview-tab" data-toggle="tab" href="#overview" role="tab" aria-controls="overview" aria-selected="true">Overview</a>
                                      <a className="nav-link" id="cast-tab" data-toggle="tab" href="#cast" role="tab" aria-controls="cast" aria-selected="true">Cast</a>
                                      <a className="nav-link" id="media-tab" data-toggle="tab" href="#media" role="tab" aria-controls="media" aria-selected="true">Media</a>
                                      <a className="nav-link" id="related-tab" data-toggle="tab" href="#related" role="tab" aria-controls="related" aria-selected="true">Related</a>
                                    </nav>
                                    <div className="row">
                                      <div className="col-lg-8">
                                        <div className="tab-content" id="myTabContent">
                                          <div id="overview" className="tab-pane fade show active" role="tabpanel" aria-labelledby="home-tab">
                                            {movieDetails.overview}
                                            <div className="card">
                                              <div className="card-header">
                                                <ul className="list-inline">
                                                  <li className="list-inline-item padding-top-7">Cast</li>
                                                  <li className="list-inline-item float-right"><button type="submit" className="btn btn-link"><small>View all cast</small></button></li>
                                                </ul>
                                              </div>
                                              <div className="card-body">
                                                <ul className="list-unstyled">
                                                  {casts}
                                                </ul>
                                              </div>
                                            </div>
                                            <div className="card">
                                              <div className="card-header">
                                                <ul className="list-inline">
                                                  <li className="list-inline-item padding-top-7">Media</li>
                                                  <li className="list-inline-item float-right">
                                                    <nav className="nav">
                                                      <a className="nav-link" id="media-tab" data-toggle="tab" href="#media" role="tab" aria-controls="media" aria-selected="true"><small>View all media</small></a>
                                                    </nav>
                                                  </li>
                                                </ul>
                                              </div>
                                              <div className="card-body">
                                                {displayMovieTrailersOnOverview}
                                              </div>
                                            </div>
                                          </div>
                                          <div id="cast" className="tab-pane fade" role="tabpanel" aria-labelledby="cast-tab">
                                            <div className="card">
                                              <div className="card-header">
                                                Cast
                                              </div>
                                              <div className="card-body">
                                                <ul className="list-unstyled">
                                                  {allCast}
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                          <div id="media" className="tab-pane fade" role="tabpanel" aria-labelledby="media-tab">
                                            <div className="card">
                                              <div className="card-header">
                                                Media
                                              </div>
                                              <div className="card-body">
                                                {image_lightBox}
                                                <div className="row">
                                                  {displayMovieTrailers}
                                                  {displayImages}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div id="related" className="tab-pane fade" role="tabpanel" aria-labelledby="media-tab">
                                            <div className="card">
                                              <div className="card-header">
                                                Similar
                                              </div>
                                              <div className="card-body">
                                                <ul className="list-unstyled">
                                                  {similarMovies}
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>


                                      <div className="col-lg-4">
                                        <ul className="list-unstyled sticky-top secondary-bar">
                                          <li>Director:</li>
                                          <li>{director}</li>
                                          <li>Writer:</li>
                                          <li>{writers.join(',')}</li>
                                          <li>Release Date:</li>
                                          <li>{ dateFormatter(movieDetails.release_date) }</li>
                                          <li>Run Time:</li>
                                          <li>{runTime}</li>
                                          <li>Tagline:</li>
                                          <li>{ movieDetails.tagline }</li>
                                          <li>Genres:</li>
                                          <li>
                                            <ul className="list-inline">
                                              {genreTags}
                                            </ul>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Footer />
                          </div>
                        </Aux>
                    );
								}
            }
	      }

				return(
					<Aux>
						{movieDetail}
					</Aux>
				)
		}
}

export default MovieDetails;