import React from 'react';
import Navbar from '../../navbar';
import Aux from '../../../HOCs/Aux';
import axios from '../../../axios';
import PosterPlaceholder from '../../../images/poster-placeholder.png';
import { dateFormatter } from '../../../utility/utilityMethods';
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
        this.setState({ tvList: [] });
        this.loadPage(newProps, 1);
    }

    componentWillMount() {
        document.body.style.background = 'black';
        this.loadPage(this.props, 1);
    }

		loadPage(props, page) {
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

				const { tvList } = this.state;
				console.log('===tvList===', tvList);
				let tvDetails = (
            <div className="backdrop"> <i className="fa fa-spinner fa-spin fa-5x fa-fw" style={{ marginLeft: '50%', position: 'relative', top: '50%'}}/> </div>
        );

        const pagination = (
            <div className="text-center">
                <ul className="pagination pagination-lg">
                  <li className="page-item"><a className="page-link" onClick={this.loadPage.bind(this, this.props, 1)} >First</a></li>
                  <li className="page-item"><a className="page-link" onClick={this.loadPage.bind(this, this.props, this.state.currentPage - 1)} >Previous</a></li>
                  <li className="page-item"><a className="page-link" onClick={this.loadPage.bind(this, this.props, this.state.currentPage)}>{ this.state.currentPage }</a></li>
                  <li className="page-item"><a className="page-link" onClick={this.loadPage.bind(this, this.props, this.state.currentPage + 1)}>{ this.state.currentPage + 1 }</a></li>
                  <li className="page-item"><a className="page-link" onClick={this.loadPage.bind(this, this.props, this.state.currentPage + 2)}>{ this.state.currentPage + 2 }</a></li>
                  <li className="page-item"><a onClick={this.loadPage.bind(this, this.props, this.state.currentPage + 1)} className="page-link">Next</a></li>
                  <li className="page-item"><a className="page-link" onClick={this.loadPage.bind(this, this.props, this.state.totalPages)} >Last</a></li>
                </ul>
            </div>
        );

				if (tvList) {
						if (tvList.results) {
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
							<Navbar />
							<div className="container container-margin">
							<h2 className="list-title"><legend>{ this.state.headerTitle }</legend></h2>
								<div className="row">
									{tvDetails}
									{pagination}
								</div>
							</div>
							<Footer />
						</Aux>
				)
		}
}

export default Television;