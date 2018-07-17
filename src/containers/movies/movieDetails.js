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

class MovieDetails extends Component {

		state = {
				credits: null,
				hasLoaded: false,
				movies: null,
				movie_id: null
		}

		componentWillMount() {
				document.body.style.background = 'black';
		}

		componentWillUnMount() {
				this.setState({
						movies: null,
						credits: null
				});
		}


		componentDidMount() {
				if (!this.props.location.state.movie_id) {
						let link = '/3/movie/'+ this.props.location.state.posts.id +'?api_key=65324ba8898442570ac397a61cfa7f22&append_to_response=credits';
            if (this.props.location.state.isTv) {
                link = '/3/tv/'+ this.props.location.state.posts.id +'?api_key=65324ba8898442570ac397a61cfa7f22&append_to_response=credits';
            }
            axios.get(link)
                    .then( response => {
                        this.setState({
                            credits : response.data
                        });
                    }).catch( error => {
                        console.log( error );
                    });
				}

				if (this.props.location.state.movie_id) {
						let link = '/3/movie/'+ this.props.location.state.movie_id +'?api_key=65324ba8898442570ac397a61cfa7f22&append_to_response=credits';
            this.setState({hasLoaded: true});
            axios.get(link)
            .then( response => {
                this.setState({
                    movies : response.data,
                    credits: response.data.credits,
                    movie_id : this.props.location.state.movie_id
                });
                this.props.fetchMovies({ posts: response.data, 'type': 'MOVIE_DETAILS' });
            }).catch( error => {
                console.log( error );
            });
        }
    }


		render() {
				let movieDetail = null;
				let movieDetails = null;
				let castAndCrew = null;

				if (this.props.location || this.state.movies) {
						movieDetail = <div className="loader"></div>;
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
														<div className="col-6 col-lg-2 padding-10" key={cast.id + '-' + cast.character}>
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
                            <div className="col-xs-12 col-lg-2 padding-10" key={ cast.id + '-' + currentCast}>
                                <figure className="figure">
                                    <img src={cast.profile_path ? 'https://image.tmdb.org/t/p/w185/' + cast.profile_path : PosterPlaceholder} className="rounded"  alt={cast.name} style={{ width: '160px', height: '240px' }}/>
                                    <figcaption className="figure-caption text-center" style={{ color: 'black' }}>
                                      { cast.name }
                                    </figcaption>
                                    <figcaption className="figure-caption text-center" style={{ color: 'black' }}>
                                        { cast.character ? 'As: ' + cast.character : cast.department}
                                    </figcaption>
                                </figure>
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
										<div className="row">
                        <div className="col">
                          <legend>Cast & Crew <a href="#demo" className="btn btn-link btnlink" data-toggle="collapse">{ seeMoreCast.length !== 0 ? 'See More' : ''}</a></legend>
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
								<div className="container" style={{ "boxShadow": "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)", marginTop: '55px', opacity: '0.95', height: '100%' }}>
									<div>{movieDetail}</div>
									{castAndCrew}
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