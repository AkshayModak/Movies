import React, { Component } from 'react';
import axios from '../../axios';
import Navbar from '../navbar';
import Aux from '../../HOCs/Aux';
import '../style.css';
import { dateFormatter } from '../../utility/utilityMethods';
import imdbLogo from '../../images/imdb.png';
import { Link } from 'react-router-dom';
import Footer from '../footer';

class People extends Component {

		state = {
				people: [],
				filmography: [],
				loaded: false
		}

		componentWillMount() {
				document.body.style.background = 'black';

				let link = '/3/person/'+ this.props.location.state.people_id +'?api_key=65324ba8898442570ac397a61cfa7f22&append_to_response=combined_credits';
				axios.get(link)
        .then( response => {
            this.setState({
                people : response.data,
                loaded: true
            });
        }).catch( error => {
            console.log( error );
        });
		}

		render() {

				let personDetails = null;
				let personDetail = null;

        if (!this.state.loaded) {
						personDetail = (
                 <div className="backdrop"> <i class="fa fa-spinner fa-spin fa-5x fa-fw" style={{ marginLeft: '50%', position: 'relative', top: '50%'}}/> </div>
            );
        }

				if (this.state.people && this.state.loaded) {
						personDetail = <div className="loader"></div>;
						personDetails = this.state.people;
						const profile_path = 'https://image.tmdb.org/t/p/w500/' + personDetails.profile_path; //'https://image.tmdb.org/t/p/original/' + movieDetails.backdrop_path
						const imdbLink = 'https://www.imdb.com/name/' + personDetails.imdb_id;

						const combined_credits = personDetails.combined_credits;
						let castAndCrewMap = null;
						if (combined_credits) {
								let castMap = combined_credits.cast;
								castAndCrewMap = castMap.concat(combined_credits.crew);
						}

						let castAndCrewResults = null;
						if (castAndCrewMap) {
								castAndCrewResults = castAndCrewMap.map( castAndCrew => {
                    if (castAndCrew.title) {
                        return (
                            <tr key={ castAndCrew.id }>
	                            <td>
	                              <Link to={{ pathname: '/movie-details', state: { movie_id: castAndCrew.id } }}>
	                                { castAndCrew.title }
	                              </Link>
	                            </td>
	                            <td> { castAndCrew.character } </td>
	                          </tr>
                        );
                    } else {
                        return '';
                    }
                });
						}

						personDetail = (
							<Aux>
								<br />
								<div className="row">
									<div className="col-lg-5">
										<img className='img-thumbnail' src={profile_path} alt={personDetails.name}/>
									</div>
									<div className="col-lg-7">
										<h3>{ personDetails.name }</h3>
										<div id="summary">
                      <p className="collapse" id="collapseSummary">
                        <strong>Biography: </strong> { personDetails.biography }
                      </p>
                      <a className="collapsed" data-toggle="collapse" href="#collapseSummary" aria-expanded="false" aria-controls="collapseSummary"><span style={{ display: 'none' }}></span></a>
                    </div>
                    <p><strong>Born:</strong> {dateFormatter(personDetails.birthday)}</p>
                    <p><strong>Place of Birth: </strong> { personDetails.place_of_birth } </p>
                    <p> <a href={ imdbLink } target="_blank"><img src={imdbLogo} alt="IMDb_logo" style={{ width: '101px', height: '49px' }}/> </a>  </p>
                    <table className="table table-condensed">
											<thead>
												<tr>
													<th>Movie Name</th>
													<th>Character</th>
												</tr>
											</thead>
											<thead>
                        { castAndCrewResults }
                      </thead>
                    </table>
									</div>
								</div>
							</Aux>
						);
        }

				return (
						<Aux>
							<Navbar />
							<div className="container">
								{personDetail}
							</div>
							<Footer />
						</Aux>
				)
		}
}

export default People;