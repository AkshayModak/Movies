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

class TelevisionDetails extends React.Component {

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
				let link = null;
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

		render() {
				const { photoIndex, isOpen, movieImages, movieTrailers } = this.state;

	      let movieDetail = null;
	      let movieDetails = null;
	      let image_lightBox = null;
	      let displayImages = null;
	      let displayMovieTrailers = null;

				movieDetail = (
            <div className="backdrop"> <i className="fa fa-spinner fa-spin fa-5x fa-fw"/> </div>
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
                document.title = movieDetails.name + ' - Nextrr';

								let castAndCrewMap = null;
                if (!this.state.credits.cast) {
                    let castMap = this.state.credits.credits.cast;
                    castAndCrewMap = castMap.concat(this.state.credits.credits.crew);
                    this.state.credits.genres.map( genre => {
                        genres.push(genre);
                        return '';
                    });
                } else {
                    let castMap = this.state.credits.cast;
                    castAndCrewMap = castMap.concat(this.state.credits.crew);
                    this.state.movies.genres.map( genre => {
                        genres.push(genre);
                        return '';
                    });
                }

                const genreTags = genres.map( genre => {
										return (
												<li key={genre.id} className="list-inline-item"><span className="badge badge-danger">
												<Link to={'/television/genre/'+genre.id} className="no-decoration">{genre.name}</Link>
												</span></li>
										)
                });

	              let runTime = [];
	              if (movieDetails.episode_run_time) {
	                  movieDetails.episode_run_time.map( run_time => {
	                      runTime.push(' ' + run_time + 'mins');
	                      return '';
	                  })
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

	              let displayTvTrailersOnOverview = null;
                if (movieTrailers && movieTrailers.results) {
                    displayTvTrailersOnOverview = ( movieTrailers.results.filter((i, index) => (index < 3)).map( (trailers, index) => {
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

                let currentCast = 0;
                let casts = (castAndCrewMap.map( cast => {
                    currentCast = currentCast + 1;
                    if (currentCast < 5) {
                        return (
                                <li key={cast.id}>
                                  <Link to={'/person/' + cast.id } key={cast.id + '-' + cast.character} className="no-decoration">
                                      <dl className="row cast">
                                        <dt className="col-xs-4"><img src={ cast.profile_path ? "https://image.tmdb.org/t/p/w185/" + cast.profile_path : PosterPlaceholder } alt={cast.name} className="card-img-top"/></dt>
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
                let allCast = (castAndCrewMap.map( cast => {
                    return (
                        <li key={cast.id + '-' + cast.job}>
                            <Link to={'/person/' + cast.id } className="no-decoration">
                              <dl className="row cast">
                                <dt className="col-xs-4"><img src={  cast.profile_path ? "https://image.tmdb.org/t/p/w185/" + cast.profile_path : PosterPlaceholder  } alt={cast.name} className="card-img-top"/></dt>
                                <dd className="col-xs-8">{cast.name}</dd>
                              </dl>
                            </Link>
                        </li>
                    )

                  })
                )

                if (castAndCrewMap.length === 0) {
                    casts = (
                        <div className="col padding-10">
                            Cast Not Available
                        </div>
                    )
                }

                let networks = null;
                if (movieDetails.networks) {
                    networks = movieDetails.networks.map( network => {
												return (
														<li key={network.id}><Link to={'/television/network/'+network.id}><img src={"https://image.tmdb.org/t/p/w92/" + network.logo_path} alt={network.name} className="network-logo"/></Link></li>
												)
                    })
                }

                const backdrop_path = 'https://image.tmdb.org/t/p/w780/' + movieDetails.backdrop_path;
                let poster_path = PosterPlaceholder;
                if (movieDetails.poster_path) {
										poster_path = 'https://image.tmdb.org/t/p/w342/' + movieDetails.poster_path;
                }

                let seasons = null;


                if (movieDetails.seasons) {
                    seasons = movieDetails.seasons.map( season => {

												return (
														<div className="row tv-seasons" key={season.id}>
	                            <div className="card seasons-card flex-md-row box-shadow">
		                            <div className="card-body d-flex flex-column align-items-start bg-white">
		                              <h3 className="mb-0 movie-card-title">
		                                {season.name}
		                              </h3>
		                              <div className="mb-1 text-muted">{dateFormatter(season.air_date)}</div>
		                              <div className="mb-1">Episodes Count: {season.episode_count}</div>
		                            </div>
		                            <div>
		                              <img className="card-img-right flex-auto d-none d-lg-block movie-card-img" src={season.poster_path ? 'https://image.tmdb.org/t/p/w185/' + season.poster_path : PosterPlaceholder} alt={season.name}/>
		                            </div>
		                            <br />
		                          </div>
		                          { season.overview ? <div className="col-lg-12 white-bg"><small>{season.overview}</small></div> : ''}
	                          </div>
												)
                    });
                }

                movieDetail = (
                    <Aux key={movieDetails.id}>
                      <div className="movie-banner" style={{backgroundImage: 'url(' + backdrop_path + ')' }}></div>
                      <div className="movie_single">
                        <div className="container transparent-bg">
                          <div className="movie-single">
                            <div className="row">
                              <div className="col-xs col-lg-4">
                                <img src={poster_path ? poster_path : PosterPlaceholder} className="sticky-top poster" alt={movieDetails.name}/>
                              </div>
                              <div className="col-lg-8 primary-bar">
                                <h3>{movieDetails.name}</h3>
                                <nav className="nav movie-tabs">
                                  <a className="nav-link active" id="overview-tab" data-toggle="tab" href="#overview" role="tab" aria-controls="overview" aria-selected="true">Overview</a>
                                  <a className="nav-link" id="cast-tab" data-toggle="tab" href="#cast" role="tab" aria-controls="cast" aria-selected="true">Cast</a>
                                  <a className="nav-link" id="media-tab" data-toggle="tab" href="#media" role="tab" aria-controls="media" aria-selected="true">Media</a>
                                  <a className="nav-link" id="related-tab" data-toggle="tab" href="#related" role="tab" aria-controls="related" aria-selected="true">Seasons</a>
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
                                                  <a id="show-more-media-tab" onClick={this.showAllMedia}><small>View all media</small></a>
                                                </nav>
                                              </li>
                                            </ul>
                                          </div>
                                          <div className="card-body">
                                            {displayTvTrailersOnOverview}
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
                                            Seasons
                                          </div>
                                          <div className="card-body">
                                            {seasons}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-lg-4">
                                    <ul className="list-unstyled sticky-top secondary-bar">
                                      <li>Network:</li>
                                      <li>
                                        <ul className="list-unstyled">
																					{networks}
                                        </ul>
                                      </li>
                                      <li>First Aired On:</li>
                                      <li>{ dateFormatter(movieDetails.first_air_date) }</li>
                                      <li>Run Time:</li>
                                      <li>{runTime.join(',')}</li>
                                      <li>Number of Episodes:</li>
                                      <li>{movieDetails.number_of_episodes}</li>
                                      <li>Number of Seasons:</li>
                                      <li>{movieDetails.number_of_seasons}</li>
                                      <li>Genres:</li>
                                      <li>
                                        <ul className="list-inline">
                                          {genreTags}
                                        </ul>
                                      </li>
                                      <li>
																				<a href={ movieDetails.homepage } className="no-decoration" target='_blank'>Home Page</a>
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

				return(
					<Aux>
						{movieDetail}
					</Aux>
				)
		}
}

export default TelevisionDetails;