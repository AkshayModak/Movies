import React, { Component } from 'react';
import Navbar from '../navbar';
import Footer from '../footer';
import Aux from '../../HOCs/Aux';
import axios from '../../axios';
import { Link } from 'react-router-dom';
import Loader from '../../utility/loader';

class Popular extends Component {

		state = {
				actors: [],
				currentPage: 1,
				showLoader: true
		}

		componentWillMount() {
        this.loadActorsByPage(1);
		}

		loadActorsByPage(page) {
				this.setState({showLoader: true});
        let link = '/3/person/popular?api_key=65324ba8898442570ac397a61cfa7f22&page=' + page;
        axios.get(link)
        .then( response => {
            if (!page) {
	              this.setState({
	                  actors : response.data,
	                  showLoader: false
	              });
                page = 1;
            } else {
                this.setState({
                    currentPage: page,
                    actors: response.data,
                    showLoader: false
                });
            }
        }).catch( error => {
            console.log( error );
        });
		}

		render() {

				console.log('====this.state.actors====', this.state.actors);
				let personDetails = null;
				let personDetail = null;
				let pagination = null;

				let loader = '';
				if (this.state.showLoader) {
						loader = <Loader />
				}

				if (this.state.actors) {
						personDetails = this.state.actors.results;

						if (personDetails) {
								console.log('====personDetails====',personDetails);
								personDetail = personDetails.map( details => {
										return (
											<div className="col-sm-6 col-lg-3">
												<Link to={ '/person/' + details.id } style={{ textDecoration: 'none', color: 'black', fontWeight: '900' }}>
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

						pagination = (
                <span>
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link"  onClick={this.loadActorsByPage.bind(this, this.state.currentPage - 1)} aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                          <span className="sr-only">Previous</span>
                        </a>
                      </li>
                      <li className="page-item"><a className="page-link" onClick={this.loadActorsByPage.bind(this, this.state.currentPage)}>{ this.state.currentPage }</a></li>
                      <li className="page-item"><a className="page-link" onClick={this.loadActorsByPage.bind(this, this.state.currentPage + 1)}>{ this.state.currentPage + 1 }</a></li>
                      <li className="page-item"><a className="page-link" onClick={this.loadActorsByPage.bind(this, this.state.currentPage + 2)}>{ this.state.currentPage + 2 }</a></li>
                      <li className="page-item">
                        <a className="page-link" onClick={this.loadActorsByPage.bind(this, this.state.currentPage + 1)} aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                          <span className="sr-only">Next</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </span>
            );
				}

				return (
					<Aux>
						<Navbar />
						<div className="container" style={{ backgroundColor: '#06151E' }}>
							<div className="row">
                {personDetail}
                {pagination}
                {loader}
              </div>
						</div>
						<Footer />
					</Aux>
				);
		}
}

export default Popular;