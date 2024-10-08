import React from 'react';
import Aux from '../../HOCs/Aux1';
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
import StarRatingComponent from 'react-star-rating-component';

class Person extends React.Component {

		state = {
        people: null,
        filmography: [],
        loaded: false
    }

		componentWillMount() {
        let link = '/3/person/'+ this.props.match.params.id +'?api_key=65324ba8898442570ac397a61cfa7f22&append_to_response=movie_credits,tv_credits,external_ids';
        axios.get(link)
        .then( response => {
            this.setState({
                people : response.data,
                loaded: true
            });
        }).catch( error => {
            console.log( error );
            this.props.history.push("/");
        });
    }

		render() {
				const { people, filmography, loaded } = this.state;

	      let personDetail = null;
	      let personDetails = null;
	      let image_lightBox = null;
	      let displayImages = null;
	      let displayMovieTrailers = null;

				personDetail = (<Loader />);

	      if (this.state.people) {
            personDetails = this.state.people;
            let genres = [];

            /*image_lightBox = (
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
            )*/

						const externalIds = personDetails.external_ids;
						let twitterLink = null;
						let fbLink = null;
						let instagramLink = null;
						let imdbLink = null;
						if (externalIds) {
								if (externalIds.facebook_id) {
										fbLink = <a className="person-externals" href={"https://www.facebook.com/" + externalIds.facebook_id} target="_blank"><i className="fa fa-facebook fa-lg"></i></a>
								}
								if (externalIds.twitter_id) {
										twitterLink = <a className="person-externals" href={"https://twitter.com/" + externalIds.twitter_id} target="_blank"><i className="fa fa-twitter fa-lg"></i></a>
								}
								if (externalIds.twitter_id) {
                    instagramLink = <a className="person-externals" href={"https://www.instagram.com/" + externalIds.instagram_id} target="_blank"><i className="fa fa-instagram fa-lg"></i></a>
                }
                if (externalIds.twitter_id) {
                    imdbLink = <a className="person-externals" href={"https://www.imdb.com/name/" + externalIds.imdb_id} target="_blank"><i className="fa fa-imdb fa-lg"></i></a>
                }
						}

            let poster_path = null;
            if (personDetails.profile_path) {
								poster_path = 'https://image.tmdb.org/t/p/w342/' + personDetails.profile_path;
            }

						let tvCredits = null;
						if (personDetails.tv_credits) {
								tvCredits = personDetails.tv_credits.cast.map( tv => {
                    return (
                      <Link to={{ pathname: '/tv-details/' + tv.id }} className="no-decoration" key={tv.id}>
                        <div className="row detailed-card">
                          <div className="card seasons-card flex-md-row box-shadow">
                            <div className="card-body d-flex flex-column align-items-start bg-white">
                              <h3 className="mb-0 movie-card-title">
                                {tv.name}
                              </h3>
                              <div className="mb-1 text-muted">{dateFormatter(tv.first_air_date)}</div>
                              <div className="mb-1">Episodes Acted In: {tv.episode_count}</div>
                            </div>
                            <div>
                              <img className="card-img-right flex-auto d-none d-lg-block movie-card-img" src={tv.poster_path ? 'https://image.tmdb.org/t/p/w185/' + tv.poster_path : PosterPlaceholder} alt={tv.name}/>
                            </div>
                            <br />
                          </div>
                          { tv.overview ? <div className="col-lg-12 white-bg"><small>{tv.overview}</small></div> : ''}
                        </div>
                      </Link>
                    )
                });
						}

						let movieCredits = null;
            if (personDetails.movie_credits) {
                movieCredits = personDetails.movie_credits.cast.map( movie => {
                    return (
                      <Link to={{ pathname: '/movie-details/' +movie.id }} className="no-decoration" key={movie.id}>
                        <div className="row detailed-card">
                          <div className="card seasons-card flex-md-row box-shadow">
                            <div className="card-body d-flex flex-column align-items-start bg-white">
                              <h3 className="mb-0 movie-card-title">
                                {movie.title}
                              </h3>
                              <div className="mb-1 text-muted">{dateFormatter(movie.release_date)}</div>
                              <div className="mb-1">
                                <StarRatingComponent
                                  name="rate1"
                                  starCount={10}
                                  value={movie.vote_average}
                                />
                              </div>
                            </div>
                            <div>
                              <img className="card-img-right flex-auto d-none d-lg-block movie-card-img" src={movie.poster_path ? 'https://image.tmdb.org/t/p/w185/' + movie.poster_path : PosterPlaceholder} alt={movie.name}/>
                            </div>
                            <br />
                          </div>
                          { movie.overview ? <div className="col-lg-12 white-bg"><small>{movie.overview}</small></div> : ''}
                        </div>
                      </Link>
                    )
                });
            }

						if (personDetails) {
								document.title = personDetails.name + ' - Nextrr';
								personDetail = (
                  <Aux>
                    <div className="person-details">
                      <div className="container">
                        <div className="person">
                          <div className="row">
                            <div className="col-xs col-lg-4">
                              <img alt="Poster" src={poster_path ? poster_path : PosterPlaceholder} className="sticky-top poster"/>
                            </div>
                            <div className="col-lg-8 primary-bar">
                              <h3>{personDetails.name}</h3>
                              <nav className="nav movie-tabs">
                                <a className="nav-link active" id="overview-tab" data-toggle="tab" href="#overview" role="tab" aria-controls="overview" aria-selected="true">Overview</a>
                                <a className="nav-link" id="movies-tab" data-toggle="tab" href="#movies" role="tab" aria-controls="movies" aria-selected="true">Movies</a>
                                <a className="nav-link" id="television-tab" data-toggle="tab" href="#television" role="tab" aria-controls="television" aria-selected="true">Television</a>
                                <a className="nav-link" id="media-tab" data-toggle="tab" href="#media" role="tab" aria-controls="media" aria-selected="true">Media</a>
                              </nav>
                              <div className="row">
                                <div className="col-lg-8">
                                  <div className="tab-content" id="myTabContent">
                                    <div id="overview" className="tab-pane fade show active" role="tabpanel" aria-labelledby="home-tab">
                                        { personDetails.biography ? personDetails.biography : 'Biography Not Available' }
                                    </div>
                                    <div id="movies" className="tab-pane fade" role="tabpanel" aria-labelledby="movies-tab">
                                      <div className="card">
                                        <div className="card-header">
                                          Movies
                                        </div>
                                        <div className="card-body">
                                            {movieCredits ? movieCredits : 'Not Available'}
                                        </div>
                                      </div>
                                    </div>
                                    <div id="television" className="tab-pane fade" role="tabpanel" aria-labelledby="television-tab">
                                      <div className="card">
                                        <div className="card-header">
																					Television Shows
                                        </div>
                                        <div className="card-body">
                                          {tvCredits && tvCredits.length > 0 ? tvCredits : 'Not Available'}
                                        </div>
                                      </div>
                                    </div>
                                    <div id="media" className="tab-pane fade" role="tabpanel" aria-labelledby="media-tab">
                                      <div className="card">
                                        <div className="card-header">
                                          Media
                                        </div>
                                        <div className="card-body">
                                          <div className="row">
                                            Media Not Available
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-lg-4">
                                  <ul className="list-unstyled sticky-top secondary-bar">
                                    <li>Known For:</li>
                                    <li>
                                      <ul className="list-unstyled">
                                        { personDetails.known_for_department }
                                      </ul>
                                    </li>
                                    <li>Birthday:</li>
                                    <li>{ dateFormatter(personDetails.birthday) }</li>
                                    <li>Place of Birth:</li>
                                    <li>{ personDetails.place_of_birth }</li>
                                    { personDetails.deathday ?
                                      <Aux>
                                      <li>Death:</li>
                                      <li>personDetails.deathday </li> </Aux> : ''
                                    }
                                    { fbLink || twitterLink || instagramLink || imdbLink ?
                                    <Aux>
                                      <li>Links:</li>
                                      <li>
                                        <ul className="nav">
                                          <li className="list-inline-item">{fbLink}</li>
                                          <li className="list-inline-item">{twitterLink}</li>
                                          <li className="list-inline-item">{instagramLink}</li>
                                          <li className="list-inline-item">{imdbLink}</li>
                                        </ul>
                                      </li>
                                    </Aux> : ''}
                                    { personDetails.homepage ?
                                      <li>
                                        <a href={ personDetails.homepage } className="no-decoration" target='_blank'>Home Page</a>
                                      </li> : ''
                                    }
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
            {personDetail}
          </Aux>
        )
    }
}

export default Person;
