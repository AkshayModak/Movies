import React from 'react';
import Navbar from '../../navbar';
import Footer from '../../footer';
import Aux from '../../../HOCs/Aux';
import PosterPlaceholder from '../../../images/poster-placeholder.png';
import axios from '../../../axios';
import { dateFormatter } from '../../../utility/utilityMethods';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';

class Upcoming extends React.Component {

		state = {
				movieList: [],
				currentPage: 1
		}

		componentWillReceiveProps(newProps) {
				this.setState({ movieList: [] });
				this.loadPage(1);
		}

		componentWillMount() {
				document.body.style.background = 'black';
				this.loadPage(1);
		}

		loadPage(page) {
				this.setState({ movieList : [] });
				let link = null;
        if ("upcoming" === this.props.match.params.id) {
            link = '/3/discover/movie?api_key=65324ba8898442570ac397a61cfa7f22&primary_release_date.gte=' + new Date().getTime() + '&sort_by=vote_average.desc&page=' + page;
        }
        if ("running" === this.props.match.params.id) {
            link = '/3/movie/now_playing?api_key=65324ba8898442570ac397a61cfa7f22&page=' + page;
        }
        if ("top-rated" === this.props.match.params.id) {
            link = '3/movie/top_rated?api_key=65324ba8898442570ac397a61cfa7f22&page=' + page;
        }
        if ("popular" === this.props.match.params.id) {
            link = '3/movie/popular?api_key=65324ba8898442570ac397a61cfa7f22&page=' + page;
        }

        axios.get(link)
        .then( response => {
            this.setState({ movieList: response.data, currentPage: this.state.currentPage + 1 });
        }).catch( error => {
            console.log( error );
        });
		}

		render() {
				const { movieList } = this.state;
				let movies = (
            <div className="backdrop"> <i class="fa fa-spinner fa-spin fa-5x fa-fw" style={{ marginLeft: '50%', position: 'relative', top: '50%'}}/> </div>
        );

        const pagination = (
            <span>
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link"  onClick={this.loadPage.bind(this, this.state.currentPage - 1)} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                      </a>
                    </li>
                    <li className="page-item"><a className="page-link" onClick={this.loadPage.bind(this, this.state.currentPage)}>{ this.state.currentPage }</a></li>
                    <li className="page-item"><a className="page-link" onClick={this.loadPage.bind(this, this.state.currentPage + 1)}>{ this.state.currentPage + 1 }</a></li>
                    <li className="page-item"><a className="page-link" onClick={this.loadPage.bind(this, this.state.currentPage + 2)}>{ this.state.currentPage + 2 }</a></li>
                    <li className="page-item">
                      <a className="page-link" onClick={this.loadPage.bind(this, this.state.currentPage + 1)} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
                </nav>
            </span>
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
                          <img class="card-img-right flex-auto d-none d-lg-block movie-card-img" src={movie.poster_path ? 'https://image.tmdb.org/t/p/w185/' + movie.poster_path : PosterPlaceholder}/>
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
								<div className="row">
									{movies}
                </div>
                {pagination}
							</div>
							<Footer />
						</Aux>
				);
		}

}

export default Upcoming;