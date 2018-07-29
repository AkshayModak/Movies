import React from 'react';
import Navbar from '../navbar';
import Aux from '../../HOCs/Aux';
import '../style.css';
import axios from '../../axios';
import Footer from '../footer';
import isoLangs from '../../utility/isoLangs';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PosterPlaceholder from '../../images/poster-placeholder.png';
import { Link } from 'react-router-dom';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import { dateFormatter } from '../../utility/utilityMethods';

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
            let link = '/3/movie/'+ this.props.match.params.id +'?api_key=65324ba8898442570ac397a61cfa7f22&append_to_response=credits,videos,images,similar';
            let movieId = this.props.match.params.id;
            if ((this.props.location.state && this.props.location.state.movie_id)) {
                link = '/3/movie/'+ this.props.location.state.movie_id +'?api_key=65324ba8898442570ac397a61cfa7f22&append_to_response=credits,videos,images,similar';
                movieId = this.props.location.state.movie_id;
            }
            console.log('====link====', link);
            this.setState({hasLoaded: true});

            axios.get(link)
            .then( response => {
                console.log('=====response====', response);
                this.setState({
                    movies : response.data,
                    credits: response.data.credits,
                    movie_id : movieId,
                    movieTrailers: response.data.videos,
                    movieImages: response.data.images,
                    similarMovies: response.data.similar
                });
                this.props.fetchMovies({ posts: response.data, 'type': 'MOVIE_DETAILS' });
            }).catch( error => {
                console.log( error );
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
	      let castAndCrew = null;
	      let image_lightBox = null;
	      let displayImages = null;
	      let displayMovieTrailers = null;

				movieDetail = (
            <div className="backdrop"> <i className="fa fa-spinner fa-spin fa-5x fa-fw" style={{ top: '50%', left: '50%', position: 'absolute' }}/> </div>
        );

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

								if (movieDetails) {
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
                                      <button className="btn btn-link" onClick={() => this.setState({ isOpen: true, photoIndex: index })} style={{ paddingRight: '0' }}>
                                        <img src={displayImage} className="img-thumbnail" style={{ maxWidth: '100%', maxHeight: '100%' }} alt={index}/>
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
                                <div className="col-xs" key={similarMovie.id} style={{ paddingLeft: '0' }}>
                                    <Link to={'/movie-details/'+similarMovie.id} style={{ textDecoration: 'none', color: 'white' }}>
                                        <li>
                                          <dl className="row">
                                            <dt className="col-xs-4"><img src={"https://image.tmdb.org/t/p/w185/" + similarMovie.poster_path} style={{ height: '80px', width: '60px' }} alt="Henry Cavill" className="card-img-top"/></dt>
                                            <dd className="col-xs-8" style={{ margin: '22px' }}>{similarMovie.title}</dd>
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
                            if (castAndCrew.job && 'Director' == castAndCrew.job) {
                                director = castAndCrew.name;
                            }
                            if (castAndCrew.job && 'Writer' === castAndCrew.job) {
                                writers.push(' ' + castAndCrew.name);
                            }
                        });

                        casts = (castAndCrewMap.map( cast => {
                            currentCast = currentCast + 1;
                            if (currentCast < 5) {
                                return (
                                        <li>
                                          <Link to={'/person/' + cast.id } style={{ textDecoration: 'none', color: 'white' }} key={cast.id + '-' + cast.character} >
                                              <dl className="row">
                                                <dt className="col-xs-4"><img src={"https://image.tmdb.org/t/p/w185/" + cast.profile_path} style={{ height: '80px', width: '60px' }} alt="Henry Cavill" className="card-img-top"/></dt>
                                                <dd className="col-xs-8" style={{ margin: '22px' }}>{cast.name}</dd>
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
                                    <Link to={'/person/' + cast.id } style={{ textDecoration: 'none', color: 'white' }}>
                                      <dl className="row">
                                        <dt className="col-xs-4"><img src={"https://image.tmdb.org/t/p/w185/" + cast.profile_path} style={{ height: '80px', width: '60px' }} alt="Henry Cavill" className="card-img-top"/></dt>
                                        <dd className="col-xs-8" style={{ margin: '22px' }}>{cast.name}</dd>
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

                    const movie_language = isoLangs[movieDetails.original_language];
                    const backdrop_path = 'https://image.tmdb.org/t/p/w780/' + movieDetails.backdrop_path;
                    const poster_path = 'https://image.tmdb.org/t/p/w342/' + movieDetails.poster_path;
                    movieDetail = (
                        <Aux key={movieDetails.id}>
                          <div className="movie-banner" style={{backgroundImage: 'url(' + backdrop_path + ')' }}></div>
                          <div className="movie_single">
                            <div className="container" style={{ background: 'transparent', color: 'white' }}>
                              <div className="movie-single">
                                <div className="row">
                                  <div className="col-xs col-lg-4">
                                    <img src={poster_path} className="sticky-top"/>
                                  </div>
                                  <div className="col-lg-8" style={{ padding: '38px' }}>
                                    <h3>{movieDetails.title}</h3>
                                    <nav className="nav movie-tabs">
                                      <a className="nav-link active" id="overview-tab" data-toggle="tab" href="#overview" role="tab" aria-controls="overview" aria-selected="true">Overview</a>
                                      <a className="nav-link" id="cast-tab" data-toggle="tab" href="#cast" role="tab" aria-controls="cast" aria-selected="true">Cast</a>
                                      <a className="nav-link" href="#" id="media-tab" data-toggle="tab" href="#media" role="tab" aria-controls="media" aria-selected="true">Media</a>
                                      <a className="nav-link" href="#" id="related-tab" data-toggle="tab" href="#related" role="tab" aria-controls="related" aria-selected="true">Related</a>
                                    </nav>
                                    <div className="row">
                                      <div className="col-lg-8" style={{ paddingTop: '38px' }}>
                                        {movieDetails.overview}
                                        <div className="tab-content" id="myTabContent">
                                          <div id="overview" className="tab-pane fade show active" role="tabpanel" aria-labelledby="home-tab">
                                            <div className="card">
                                              <div className="card-header" style={{ backgroundColor: '#06151E', borderBottom: '1px solid grey' }}>
                                                <ul className="list-inline">
                                                  <li className="list-inline-item padding-top-7">Cast</li>
                                                  <li className="list-inline-item float-right"><button type="submit" className="btn btn-link"><small>View all cast</small></button></li>
                                                </ul>
                                              </div>
                                              <div className="card-body" style={{ backgroundColor: '#06151E' }}>
                                                <ul className="list-unstyled">
                                                  {casts}
                                                </ul>
                                              </div>
                                            </div>
                                            <div className="card">
                                              <div className="card-header" style={{ backgroundColor: '#06151E', borderBottom: '1px solid grey' }}>
                                                <ul className="list-inline">
                                                  <li className="list-inline-item padding-top-7">Media</li>
                                                  <li className="list-inline-item float-right">
                                                    <nav className="nav">
                                                      <a className="nav-link" href="#" id="media-tab" data-toggle="tab" href="#media" role="tab" aria-controls="media" aria-selected="true"><small>View all media</small></a>
                                                    </nav>
                                                  </li>
                                                </ul>
                                              </div>
                                              <div className="card-body" style={{ backgroundColor: '#06151E' }}>
                                                {displayMovieTrailers}
                                              </div>
                                            </div>
                                          </div>
                                          <div id="cast" className="tab-pane fade" role="tabpanel" aria-labelledby="cast-tab">
                                            <div className="card">
                                              <div className="card-header" style={{ backgroundColor: '#06151E', borderBottom: '1px solid grey' }}>
                                                Cast
                                              </div>
                                              <div className="card-body" style={{ backgroundColor: '#06151E' }}>
                                                <ul className="list-unstyled">
                                                  {allCast}
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                          <div id="media" className="tab-pane fade" role="tabpanel" aria-labelledby="media-tab">
                                            {image_lightBox}
                                            <div className="row">
                                              {displayMovieTrailers}
                                              {displayImages}
                                            </div>
                                          </div>
                                          <div id="related" className="tab-pane fade" role="tabpanel" aria-labelledby="media-tab">
                                            <div className="card">
                                              <div className="card-header" style={{ backgroundColor: '#06151E', borderBottom: '1px solid grey' }}>
                                                Similar
                                              </div>
                                              <div className="card-body" style={{ backgroundColor: '#06151E' }}>
                                                <ul className="list-unstyled">
                                                  {similarMovies}
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>


                                      <div className="col-lg-4" style={{ marginTop: '173px' }}>
                                        <ul className="list-unstyled sticky-top" style={{ lineHeight: '2.5em' }}>
                                          <li style={{ fontWeight: '900' }}>Director:</li>
                                          <li>{director}</li>
                                          <li style={{ fontWeight: '900' }}>Writer:</li>
                                          <li>{writers.join(',')}</li>
                                          <li style={{ fontWeight: '900' }}>Release Date:</li>
                                          <li>{ dateFormatter(movieDetails.release_date) }</li>
                                          <li style={{ fontWeight: '900' }}>Run Time:</li>
                                          <li>{runTime}</li>
                                          <li style={{ fontWeight: '900' }}>Tagline:</li>
                                          <li>{ movieDetails.tagline }</li>
                                          <li style={{ fontWeight: '900' }}>Genres:</li>
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
						<Navbar />
						{movieDetail}
					</Aux>
				)
		}
}

export default MovieDetails;