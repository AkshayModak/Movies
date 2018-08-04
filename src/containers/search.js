import React from 'react';
import Aux from '../HOCs/Aux';
import axios from '../axios';
import NoResult from '../static/noresult';
import PosterPlaceholder from '../images/poster-placeholder.png';
import { dateFormatter } from '../utility/utilityMethods';
import Loader from '../utility/loader';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import Footer from './footer';

class Search extends React.Component {

		state = {
				searchResults : [],
				totalPages: null,
				currentPage: 1,
				hasLoaded: false
		}

		componentWillMount() {
				this.loadPage(this.props, 1);
		}

		componentWillReceiveProps(newProps) {
				this.loadPage(newProps, 1);
		}

		loadPage(props, page) {
				this.setState({ searchResults : null });
				const query = props.match.params.query;
				if (query) {
						let link = '/3/search/multi?api_key=65324ba8898442570ac397a61cfa7f22&query=' + query + '&page=' + page;
            axios.get(link)
            .then( response => {
                this.setState({ searchResults : response.data.results, totalPages : response.data.total_pages, currentPage: page, hasLoaded: true });
            }).catch( error => {
                console.log( error );
            });
				}
    }

		render() {

				let searchResult = (<Loader />);
				let searchResults = this.state.searchResults;
				let pagination = null;
				let noresults = false;

				if (this.state.hasLoaded && searchResults && searchResults.length > 0) {
						pagination = (
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    <li className="page-item">
                      <a className="page-link" onClick={this.loadPage.bind(this, this.props, 1)} tabIndex="-1">First</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" onClick={this.loadPage.bind(this, this.props, this.state.currentPage - 1)} tabIndex="-1"><i className="fa fa-angle-double-left" aria-hidden="true"></i></a>
                    </li>
                    <li className="page-item"><a className="page-link" onClick={this.loadPage.bind(this, this.props, this.state.currentPage)}>{ this.state.currentPage }</a></li>
                    <li className={this.state.totalPages >= (this.state.currentPage + 1) ? "page-item" : "page-item disabled"}><a className="page-link" onClick={this.loadPage.bind(this, this.props, this.state.currentPage + 1)}>{ this.state.currentPage + 1 }</a></li>
                    <li className={(this.state.totalPages >= (this.state.currentPage + 2)) ? "page-item" : "page-item disabled"}><a className="page-link" onClick={this.loadPage.bind(this, this.props, this.state.currentPage + 2)}>{ this.state.currentPage + 2 }</a></li>
                    <li className={this.state.totalPages >= (this.state.currentPage + 1) ? "page-item" : "page-item disabled"}><a className="page-link" onClick={this.loadPage.bind(this, this.props, this.state.currentPage + 1)}><i className="fa fa-angle-double-right" aria-hidden="true"></i></a></li>
                    <li className="page-item">
                      <a className="page-link" onClick={this.loadPage.bind(this, this.props, this.state.totalPages)}>Last</a>
                    </li>
                  </ul>
                </nav>
            );


            searchResult = searchResults.map ( result => {
								let mediaType = null;
								let link = null;
								let name = null;
								let imagePath = null;
								let ratingAndKnownFor = null;
								if ('tv' === result.media_type) {
										link = '/tv-details/' + result.id;
										mediaType = "Television Show";
										name = result.name;
										imagePath = result.poster_path;
										ratingAndKnownFor = (
												<StarRatingComponent
                          name="rate1"
                          starCount={10}
                          value={result.vote_average}
                        />
										)
								}
								if ('movie' === result.media_type) {
										link = '/movie-details/' + result.id;
										mediaType = "Movie";
										name = result.title;
										imagePath = result.poster_path;
										ratingAndKnownFor = (
                        <StarRatingComponent
                          name="rate1"
                          starCount={10}
                          value={result.vote_average}
                        />
                    )
								}

								if ('person' === result.media_type) {
                    link = '/person/' + result.id;
                    mediaType = "Person";
                    name = result.name;
                    imagePath = result.profile_path;
                    ratingAndKnownFor = result.known_for;
                }

								return (
										<div className="col-lg-6" key={result.id}>
                      <Link to={link} style={{ textDecoration: 'none', color: 'black' }}>
                        <div className="card flex-md-row mb-4 box-shadow h-md-250 movie-cards">
                          <div className="card-body d-flex flex-column align-items-start">
                            <h3 className="mb-0 movie-card-title">
                              {name}
                            </h3>
                            <div className="mb-1 text-muted">{mediaType}</div>
                            <strong className="d-inline-block mb-2 text-primary">
                              <StarRatingComponent
                                name="rate1"
                                starCount={10}
                                value={result.vote_average}
                              />
                            </strong>
                            <p className="card-text mb-auto"><small>{result.overview ? `${(result.overview).substring(0, 150)}...`  : ''}</small></p>
                          </div>
                          <div>
                            <img className="card-img-right flex-auto d-none d-lg-block movie-card-img" src={imagePath ? 'https://image.tmdb.org/t/p/w185/' + imagePath : PosterPlaceholder} alt={result.name}/>
                          </div>
                        </div>
                      </Link>
                    </div>
								)
            });
				} else if (this.state.hasLoaded && !(searchResults && searchResults.length > 0)){
						noresults = true;
						searchResult = '';
				}

				return(
						<Aux>
              <div className="container" style={{ backgroundColor: '#06151E', marginTop: '120px' }}>
                <h2 className="list-title" style={{ color: 'white', fontWeight: '900' }}><legend>{ noresults ? 'No' : 'Search' } Result(s) For '{this.props.match.params.query}'</legend></h2>
                <div className="row">
                  {searchResult}
                </div>
                <div style={{ padding: '10px' }}>
                  {pagination}
                </div>
              </div>
              <Footer/>
            </Aux>
				);
		}
}

export default Search;