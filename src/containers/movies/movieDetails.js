import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style.css';
import Aux from '../../HOCs/Aux';
import Navbar from '../navbar';
import axios from '../../axios';
import Footer from '../footer';
import isoLangs from '../../utility/isoLangs';
import CircularProgressbar from 'react-circular-progressbar';
import styles from 'react-circular-progressbar/dist/styles.css';

class MovieDetails extends Component {

		state = {
				credits: null
		}

		componentWillMount() {
				document.body.style.background = 'black';
		}


		componentDidMount() {
				if (this.props.location) {
						axios.get('/3/movie/'+ this.props.location.state.posts.id +'?api_key=65324ba8898442570ac397a61cfa7f22&append_to_response=credits')
            .then( response => {
                this.setState({
                    credits : response.data
                });
            }).catch( error => {
                console.log( error );
            });
            this.props.fetchMovies({ posts: this.props.location.state.posts, 'type': 'MOVIE_DETAILS' });
				}
				console.log('====isoLangs====', isoLangs.hi);
    }


		render() {
				let movieDetail = null;
				let movieDetails = null;

				console.log('===this.state.credits===', this.state.credits);
				if (this.props.location) {
						movieDetail = <div className="loader"></div>;
            movieDetails = null;


						console.log('====movieDetail.genres====', movieDetails);
						let genres = [];
						if (this.state.credits) {

								movieDetails = this.state.credits;
                movieDetails.backdrop = '';
                movieDetails.poster = 'https://image.tmdb.org/t/p/w500/' + movieDetails.poster_path; //'https://image.tmdb.org/t/p/original/' + movieDetails.backdrop_path
                document.body.style.background = "url(https://image.tmdb.org/t/p/original/" + movieDetails.backdrop_path +")";
                document.body.style.height = '100%';
                document.body.style.backgroundAttachment = 'fixed';
                document.body.style.backgroundPosition = 'center';
                document.body.style.backgroundRepeat = 'no-repeat';
                document.body.style.backgroundSize = 'cover';

                this.state.credits.genres.map( genre => {
                    genres.push(' ' + genre.name);
                });

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
						}
				}
				return (
							<Aux>
								<Navbar />
								<div className="container" style={{ "boxShadow": "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)", marginTop: '55px', opacity: '0.95' }}>
									<div>{movieDetail}</div>
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