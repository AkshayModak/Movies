import React from 'react';
import Navbar from '../../navbar';
import Footer from '../../footer';
import Aux from '../../../HOCs/Aux';
import PosterPlaceholder from '../../../images/poster-placeholder.png';
import axios from '../../../axios';
import { dateFormatter } from '../../../utility/utilityMethods';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import Loader from '../../../utility/loader';

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
				document.body.style.background = 'black';
				this.loadPage(this.props, 1);
		}

		loadPage(props, page) {
				this.setState({ movieList: [] });
				let link = null;
				console.log('=====this.props.match.params.id====', props.match.params.id);
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
        });
		}

		render() {
				document.title = this.state.headerTitle + ' - Nextrr';
				const { movieList } = this.state;
				let movies = (
            <div className="backdrop"> <i class="fa fa-spinner fa-spin fa-5x fa-fw" style={{ marginLeft: '50%', position: 'relative', top: '50%'}}/> </div>
        );

        const pagination = (
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <li class="page-item">
                  <a class="page-link" onClick={this.loadPage.bind(this, this.props, 1)} tabindex="-1">First</a>
                </li>
                <li class="page-item disabled">
                  <a class="page-link" onClick={this.loadPage.bind(this, this.props, this.state.currentPage - 1)} tabindex="-1"><i class="fa fa-angle-double-left" aria-hidden="true"></i></a>
                </li>
                <li className="page-item"><a className="page-link" onClick={this.loadPage.bind(this, this.props, this.state.currentPage)}>{ this.state.currentPage }</a></li>
                <li className="page-item"><a className="page-link" onClick={this.loadPage.bind(this, this.props, this.state.currentPage + 1)}>{ this.state.currentPage + 1 }</a></li>
                <li className="page-item"><a className="page-link" onClick={this.loadPage.bind(this, this.props, this.state.currentPage + 2)}>{ this.state.currentPage + 2 }</a></li>
                <li class="page-item"><a class="page-link" onClick={this.loadPage.bind(this, this.props, this.state.currentPage + 1)}><i class="fa fa-angle-double-right" aria-hidden="true"></i></a></li>
                <li class="page-item">
                  <a class="page-link" onClick={this.loadPage.bind(this, this.props, this.state.totalPages)}>Last</a>
                </li>
              </ul>
            </nav>
        );

				const movieResults = movieList.results;
				if (movieResults) {
						movies = movieResults.map( movie => {
                return (
									<div className="col-lg-6">
										<Link to={"/movie-details/" + movie.id} exact style={{ textDecoration: 'none', color: 'black' }}>
                      <div class="card flex-md-row mb-4 box-shadow h-md-250 movie-cards">
                        <div class="card-body d-flex flex-column align-items-start">
                          <h3 class="mb-0 movie-card-title">
                            {movie.title}
                          </h3>
                          <div class="mb-1 text-muted">{dateFormatter(movie.release_date)}</div>
                          <strong class="d-inline-block mb-2 text-primary">
                            <StarRatingComponent
                              name="rate1"
                              starCount={10}
                              value={movie.vote_average}
                            />
                          </strong>
                          <p class="card-text mb-auto"><small>{`${(movie.overview).substring(0, 150)}...`}</small></p>
                        </div>
                        <div>
                          <img class="card-img-right flex-auto d-none d-lg-block movie-card-img" src={movie.poster_path ? 'https://image.tmdb.org/t/p/w185/' + movie.poster_path : PosterPlaceholder} alt={movie.title}/>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
            });
				}

				return(
						<Aux>
							<Navbar/>
							<div className="container container-margin">
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