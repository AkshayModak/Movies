import React, { Component } from 'react';
import Users from '../../Movies';
import { connect } from 'react-redux';
import axios from '../../../axios';
import Aux from '../../../HOCs/Aux1';
import OuterNavbar from '../../outernavbar';

class MovieContainer extends Component {

		state = {
				posts: [],
				currentPage: 1
		}

		loadMoviesByYear = (page) => {
				if (!page) {
						page = 1;
				} else {
						this.setState({currentPage: page});
				}
				axios.get('/3/discover/movie?api_key=65324ba8898442570ac397a61cfa7f22&primary_release_date.gte=' + new Date().getTime() + '&sort_by=vote_average.desc&page=' + page)
        .then( response => {
            this.setState({
                posts : response.data
            });
        }).catch( error => {
            console.log( error );
        });
		}

		componentWillMount () {
				this.loadMoviesByYear(1);
    }

		render() {
				let pagination = '';
				if (!this.props.hidePagination) {
						pagination = (
                <span>
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <a className="page-link"  onClick={this.loadMoviesByYear.bind(this, this.state.currentPage - 1)} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                          </a>
                        </li>
                        <li className="page-item"><a className="page-link" onClick={this.loadMoviesByYear.bind(this, this.state.currentPage)}>{ this.state.currentPage }</a></li>
                        <li className="page-item"><a className="page-link" onClick={this.loadMoviesByYear.bind(this, this.state.currentPage + 1)}>{ this.state.currentPage + 1 }</a></li>
                        <li className="page-item"><a className="page-link" onClick={this.loadMoviesByYear.bind(this, this.state.currentPage + 2)}>{ this.state.currentPage + 2 }</a></li>
                        <li className="page-item">
                          <a className="page-link" onClick={this.loadMoviesByYear.bind(this, this.state.currentPage + 1)} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                </span>
            );
				}

				let outerNavbar = '';
				if (!this.props.hidePagination) {
          outerNavbar = (<OuterNavbar />);
        }

				return (
						<Aux>
							{ outerNavbar }
							<Users movieDetails={this.state.posts} showTotal={this.props.showTotal} isUpcoming={this.props.isUpcoming}/>
							{pagination}
						</Aux>
				)
		}
}

const mapDispatchToProps = dispatch => {
    return {
        fetchMovies : (data) => dispatch(data)
    }
};

export default connect(null, mapDispatchToProps)(MovieContainer);