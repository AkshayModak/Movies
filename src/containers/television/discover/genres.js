import React from 'react';
import Aux from '../../../HOCs/Aux';
import axios from '../../../axios';
import PosterPlaceholder from '../../../images/poster-placeholder.png';
import { dateFormatter } from '../../../utility/utilityMethods';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import Footer from '../../footer';
import genreList from '../../../utility/genreIdToname';

class SearchByGenre extends React.Component {

		state = {
				tvList : [],
				currentPage : 1,
				headerTitle: null,
				totalPages: null,
				genreName: null
		}

    componentWillReceiveProps(newProps) {
        this.setState({ tvList: [] });
        this.loadPage(newProps, 1);
    }

    componentWillMount() {
        this.loadPage(this.props, 1);
    }

		loadPage(props, page) {
				const link = '/3/discover/tv?api_key=65324ba8898442570ac397a61cfa7f22&with_genres=' + props.match.params.id + '&page=' + page;
        axios.get(link)
        .then( response => {
            this.setState({ tvList: response.data, currentPage: page, totalPages: response.data.total_pages, genreName: genreList[props.match.params.id].name });
        }).catch( error => {
            console.log( error );
            this.props.history.push("/");
        });

		}

		render() {
				const { tvList } = this.state;
				let tvDetails = (
            <div className="backdrop"> <i className="fa fa-spinner fa-spin fa-5x fa-fw" style={{ marginLeft: '50%', position: 'relative', top: '50%'}}/> </div>
        );

        const pagination = (
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <a className="page-link" onClick={this.loadPage.bind(this, this.props, 1)} tabIndex="-1">First</a>
                </li>
                <li className="page-item">
                  <a className="page-link" onClick={this.loadPage.bind(this, this.props, this.state.currentPage - 1)} tabIndex="-1"><i className="fa fa-angle-double-left" aria-hidden="true"></i></a>
                </li>
                <li className="page-item"><a className="page-link" onClick={this.loadPage.bind(this, this.props, this.state.currentPage)}>{ this.state.currentPage }</a></li>
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
								document.title = 'Television Shows - Nextrr';
								tvDetails = tvList.results.map( tv => {
                    return (
                        <div className="col-lg-6" key={tv.id}>
                          <Link to={"/tv-details/" + tv.id} style={{ textDecoration: 'none', color: 'black' }}>
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
                                <p className="card-text mb-auto"><small>{`${(tv.overview).substring(0, 150)}...`}</small></p>
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
							<h2 className="list-title"><legend>{ this.state.genreName }</legend></h2>
								<div className="row">
									{tvDetails}
								</div>
								<div style={{ padding: '10px' }}>
									{pagination}
								</div>
							</div>
							<Footer style={{ display: 'block', position: 'absolute' }}/>
						</Aux>
				)
		}
}

export default SearchByGenre;