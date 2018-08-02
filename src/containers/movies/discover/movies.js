import React from 'react';
import Footer from '../../footer';
import Aux from '../../../HOCs/Aux';
import PosterPlaceholder from '../../../images/poster-placeholder.png';
import axios from '../../../axios';
import { dateFormatter } from '../../../utility/utilityMethods';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';

class Movies extends React.Component {

		state = {
				movieList: [],
				currentPage: 1,
				headerTitle: null,
				totalPages: 1
		}

		componentWillReceiveProps(newProps) {
				this.loadPage(newProps, 1);
		}

		componentWillMount() {
				this.loadPage(this.props, 1);
		}

		loadPage(props, page) {
				this.setState({ movieList: [] });
				let link = null;
        if ("upcoming" === props.match.params.id) {
            link = '/3/discover/movie?api_key=65324ba8898442570ac397a61cfa7f22&primary_release_date.gte=' + new Date().getTime() + '&sort_by=vote_average.desc&page=' + page;
            this.setState({ headerTitle: 'Upcoming Movies' });
        }
        if ("in-theatres" === props.match.params.id) {
            link = '/3/movie/now_playing?api_key=65324ba8898442570ac397a61cfa7f22&page=' + page;
            this.setState({ headerTitle: 'In Theatres' });
        }
        if ("top-rated" === props.match.params.id) {
            link = '3/movie/top_rated?api_key=65324ba8898442570ac397a61cfa7f22&page=' + page;
            this.setState({ headerTitle: 'Top Rated Movies' });
        }
        if ("popular" === props.match.params.id) {
            link = '3/movie/popular?api_key=65324ba8898442570ac397a61cfa7f22&page=' + page;
            this.setState({ headerTitle: 'Popular Movies' });
        }

        axios.get(link)
        .then( response => {
            this.setState({ movieList: response.data, currentPage: this.state.currentPage + 1, totalPages: response.data.total_pages });
        }).catch( error => {
            console.log( error );
            this.props.history.push("/");
        });
		}

		render() {
				document.title = this.state.headerTitle + ' - Nextrr';
				const { movieList } = this.state;
				let movies = (
            <div className="backdrop"> <i className="fa fa-spinner fa-spin fa-5x fa-fw"/> </div>
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

				const movieResults = movieList.results;
				if (movieResults) {
						movies = movieResults.map( movie => {
                return (
									<div className="col-lg-6" key={movie.id}>
										<Link to={"/movie-details/" + movie.id} className="no-card-decoration">
                      <div className="card flex-md-row mb-4 box-shadow h-md-250 movie-cards">
                        <div className="card-body d-flex flex-column align-items-start">
                          <h3 className="mb-0 movie-card-title">
                            {movie.title}
                          </h3>
                          <div className="mb-1 text-muted">{dateFormatter(movie.release_date)}</div>
                          <strong className="d-inline-block mb-2 text-primary">
                            <StarRatingComponent
                              name="rate1"
                              starCount={10}
                              value={movie.vote_average}
                            />
                          </strong>
                          <p className="card-text mb-auto">{`${(movie.overview).substring(0, 150)}...`}</p>
                        </div>
                        <div>
                          <img className="card-img-right flex-auto d-none d-lg-block movie-card-img" src={movie.poster_path ? 'https://image.tmdb.org/t/p/w185/' + movie.poster_path : PosterPlaceholder} alt={movie.title}/>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
            });
				}

				return(
						<Aux>
							<div className="container card-list">
								<h2 className="list-title"><legend>{ this.state.headerTitle }</legend></h2>
								<div className="row">
									{movies}
                </div>
                <div style={{ padding: '10px' }}>
                  {pagination}
                </div>
							</div>
							<Footer />
						</Aux>
				);
		}

}

export default Movies;