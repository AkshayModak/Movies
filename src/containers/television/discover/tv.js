import React from 'react';
import Aux from '../../../HOCs/Aux';
import axios from '../../../axios';
import PosterPlaceholder from '../../../images/poster-placeholder.png';
import { dateFormatter } from '../../../utility/utilityMethods';
import Loader from '../../../utility/loader';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import Footer from '../../footer';

class Television extends React.Component {

		state = {
				tvList : [],
				currentPage : 1,
				headerTitle: null,
				totalPages: null
		}

    componentWillReceiveProps(newProps) {
        this.loadPage(newProps, 1);
    }

    componentWillMount() {
        this.loadPage(this.props, 1);
    }

		loadPage(props, page) {
				if (page > 1000) {
						page = 1000;
				}
				this.setState({ tvList: [] });
				let link = null;
        if ("airing-today" === props.match.params.id) {
            this.setState({ headerTitle: 'Airing Today' });
            link = '/3/tv/airing_today?api_key=65324ba8898442570ac397a61cfa7f22&page=' + page;
        }
        if ("top-rated" === props.match.params.id) {
		        this.setState({ headerTitle: 'Top Rated' });
            link = '3/tv/top_rated?api_key=65324ba8898442570ac397a61cfa7f22&page=' + page;
        }
        if ("popular" === props.match.params.id) {
            this.setState({ headerTitle: 'Popular Shows' });
            link = '3/tv/popular?api_key=65324ba8898442570ac397a61cfa7f22&page=' + page;
        }
        if ("on-air" === props.match.params.id) {
            this.setState({ headerTitle: 'On Air' });
            link = '/3/tv/on_the_air?api_key=65324ba8898442570ac397a61cfa7f22&page=' + page;
        }

        axios.get(link)
        .then( response => {
            this.setState({ tvList: response.data, currentPage: page, totalPages: response.data.total_pages });
        }).catch( error => {
            console.log( error );
        });

		}

		render() {
				document.title = this.state.headerTitle + ' - Nextrr';
				const { tvList } = this.state;
				let tvDetails = (<Loader />);

        const pagination = (
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

				if (tvList) {
						if (tvList.results) {
								tvDetails = tvList.results.map( tv => {
                    return (
                        <div className="col-lg-6" key={tv.id}>
                          <Link to={"/tv-details/" + tv.id} className="no-card-decoration">
                            <div className="card flex-md-row mb-4 box-shadow h-md-250 movie-cards">
                              <div className="card-body d-flex flex-column align-items-start">
                                <h3 className="mb-0 movie-card-title">
                                  {tv.name}
                                </h3>
                                <div className="mb-1 text-muted">{dateFormatter(tv.first_air_date)}</div>
                                <strong className="d-inline-block mb-2 text-primary">
                                  <StarRatingComponent
                                    name="rate1"
                                    starCount={10}
                                    value={tv.vote_average}
                                  />
                                </strong>
                                <p className="card-text mb-auto">{`${(tv.overview).substring(0, 200)}...`}</p>
                              </div>
                              <div>
                                <img className="card-img-right flex-auto d-none d-lg-block movie-card-img" src={tv.poster_path ? 'https://image.tmdb.org/t/p/w185/' + tv.poster_path : PosterPlaceholder} alt={tv.name}/>
                              </div>
                            </div>
                          </Link>
                        </div>
                    )
								});
						}
				}

				return (
						<Aux>
							<div className="container card-list">
							<h2 className="list-title"><legend>{ this.state.headerTitle }</legend></h2>
								<div className="row">
									{tvDetails}
								</div>
								<div style={{ padding: '10px' }}>
									{pagination}
								</div>
							</div>
							<Footer/>
						</Aux>
				)
		}
}

export default Television;