import React, { Component } from 'react';
import Footer from '../footer';
import Aux from '../../HOCs/Aux1';
import axios from '../../axios';
import { Link } from 'react-router-dom';
import Loader from '../../utility/loader';
import PosterPlaceHolder from '../../images/poster-placeholder.png';

class Popular extends Component {

		state = {
				actors: [],
				currentPage: 1,
				totalPages: 1000
		}

		componentWillMount() {
        this.loadPage(1);
		}

		loadPage(props, page) {
				this.setState({ actors : []});
        let link = '/3/person/popular?api_key=65324ba8898442570ac397a61cfa7f22&page=' + page;
        axios.get(link)
        .then( response => {
            if (!page) {
	              this.setState({
	                  actors : response.data,
	                  totalPages: response.data.total_pages
	              });
                page = 1;
            } else {
                this.setState({
                    currentPage: page,
                    actors: response.data,
                    totalPages: response.data.total_pages
                });
            }
        }).catch( error => {
            console.log( error );
            this.props.history.push("/");
        });
		}

		render() {

				let personDetails = null;
				let personDetail = (<Loader />);
				let pagination = null;

				if (this.state.actors) {
						personDetails = this.state.actors.results;

						if (personDetails) {
								personDetail = personDetails.map( details => {
										return (
											<div className="col-sm-6 col-lg-3" key={details.id}>
												<Link to={ '/person/' + details.id } style={{ textDecoration: 'none', color: 'black', fontWeight: '900' }}>
		                      <div className="card actors-card">
	                          <img src={ details.profile_path ? 'https://image.tmdb.org/t/p/w500/' + details.profile_path : PosterPlaceHolder} alt={details.name} className="card-img-top"/>
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
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center">
                    <li className="page-item">
                      <a className="page-link" onClick={this.loadPage.bind(this, this.props, 1)} tabIndex="-1">First</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" onClick={this.loadPage.bind(this, this.props, this.state.currentPage - 1)} tabIndex="-1"><i className="fa fa-angle-double-left" aria-hidden="true"></i></a>
                    </li>
                    <li className="page-item"><a className="page-link" style={{ background: 'crimson', color: 'white' }} onClick={this.loadPage.bind(this, this.props, this.state.currentPage)}>{ this.state.currentPage }</a></li>
                    <li className="page-item"><a className="page-link" onClick={this.loadPage.bind(this, this.props, this.state.currentPage + 1)}>{ this.state.currentPage + 1 }</a></li>
                    <li className="page-item"><a className="page-link" onClick={this.loadPage.bind(this, this.props, this.state.currentPage + 2)}>{ this.state.currentPage + 2 }</a></li>
                    <li className="page-item"><a className="page-link" onClick={this.loadPage.bind(this, this.props, this.state.currentPage + 1)}><i className="fa fa-angle-double-right" aria-hidden="true"></i></a></li>
                    <li className="page-item">
                      <a className="page-link" onClick={this.loadPage.bind(this, this.props, this.state.totalPages)}>Last</a>
                    </li>
                  </ul>
                </nav>
            );
				}

				return (
					<Aux>
						<div className="container card-list">
							<h2 className="list-title"><legend>Popular People</legend></h2>
							<div className="row">
                {personDetail}
              </div>
              <div style={{ paddingTop: '10px' }}>
								{pagination}
              </div>
						</div>
						<Footer />
					</Aux>
				);
		}
}

export default Popular;