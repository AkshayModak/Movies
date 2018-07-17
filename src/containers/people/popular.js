import React, { Component } from 'react';
import Navbar from '../navbar';
import Footer from '../footer';
import Aux from '../../HOCs/Aux';
import axios from '../../axios';
import { Link } from 'react-router-dom';

class Popular extends Component {

		state = {
				actors: []
		}

		componentWillMount() {
				document.body.style.background = 'black';
				let link = '/3/person/popular?api_key=65324ba8898442570ac397a61cfa7f22&page=1';
        axios.get(link)
        .then( response => {
            this.setState({
                actors : response.data
            });
        }).catch( error => {
            console.log( error );
        });
		}

		render() {

				console.log('====this.state.actors====', this.state.actors);
				let personDetails = null;
				let personDetail = null;

				if (this.state.actors) {
						personDetails = this.state.actors.results;

						if (personDetails) {
								console.log('====personDetails====',personDetails);
								personDetail = personDetails.map( details => {
										return (
											<div className="col-sm-6 col-lg-3">
												<Link to={{ pathname: '/person', state: { people_id: details.id } }} style={{ textDecoration: 'none', color: 'black', fontWeight: '900' }}>
		                      <div className="card actors-card">
	                          <img src={ 'https://image.tmdb.org/t/p/w500/' + details.profile_path } alt={details.name} className="card-img-top"/>
	                          <div className="card-body">
	                            <p className="card-text">
	                              { details.name }
	                            </p>
	                          </div>
	                        </div>
                        </Link>
											</div>
                    )
								});
						}

						console.log('====personDetail====', personDetail);
				}

				return (
					<Aux>
						<Navbar />
						<div className="container">
							<div className="row">
                {personDetail}
              </div>
						</div>
						<Footer />
					</Aux>
				);
		}
}

export default Popular;