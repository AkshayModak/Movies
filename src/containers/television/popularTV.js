import React, { Component } from 'react';
import Users from '../Movies';
import { connect } from 'react-redux';
import axios from '../../axios';
import Aux from '../../HOCs/Aux';

class PopularTV extends Component {

		state = {
				tv: [],
				currentPage: 1
		}

		loadPopularTV = (page) => {
				if (!page) {
						page = 1;
				} else {
						this.setState({currentPage: page});
				}
				axios.get('/3/tv/popular?api_key=65324ba8898442570ac397a61cfa7f22&page=' + page)
        .then( response => {
            this.setState({
                tv : response.data
            });
            this.props.fetchMovies({ tv: response.data, 'type': 'POPULAR_TV' });
        }).catch( error => {
            console.log( error );
        });
		}

		componentWillMount () {
				this.loadPopularTV(1);
    }

		render() {
				let pagination = '';
				if (!this.props.hidePagination) {
						pagination = (
                <span>
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <a className="page-link"  onClick={this.loadPopularTV.bind(this, this.state.currentPage - 1)} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                          </a>
                        </li>
                        <li className="page-item"><a className="page-link" onClick={this.loadPopularTV.bind(this, this.state.currentPage)}>{ this.state.currentPage }</a></li>
                        <li className="page-item"><a className="page-link" onClick={this.loadPopularTV.bind(this, this.state.currentPage + 1)}>{ this.state.currentPage + 1 }</a></li>
                        <li className="page-item"><a className="page-link" onClick={this.loadPopularTV.bind(this, this.state.currentPage + 2)}>{ this.state.currentPage + 2 }</a></li>
                        <li className="page-item">
                          <a className="page-link" onClick={this.loadPopularTV.bind(this, this.state.currentPage + 1)} aria-label="Next">
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
							<Users movieDetails={this.state.tv} showTotal={this.props.showTotal} isTv={true}/>
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

export default connect(null, mapDispatchToProps)(PopularTV);