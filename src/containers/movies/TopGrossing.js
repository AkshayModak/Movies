import React, { Component } from 'react';
import axios from '../../axios';
import { connect } from 'react-redux';
import classes from '../style.css';

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

class TopGrossing extends Component {

		/*/3/discover/movie?api_key=' +  api_key + '&primary_release_year=2018&sort_by=revenue.desc*/
		// Currency format reference -- https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript

		state = {
				moviesList : []
		}

    componentWillMount () {
        let revenueMovieList = [];
        axios.get('/3/discover/movie?api_key=65324ba8898442570ac397a61cfa7f22&primary_release_year=2018&sort_by=revenue.desc')
        .then( response => {
            if (response.data.results) {
                response.data.results.slice(0, 5).map( movie => (
                    axios.get('/3/movie/'+ movie.id +'?api_key=65324ba8898442570ac397a61cfa7f22&language=en-US')
                    .then( response => {
												let revenueList = this.state.moviesList;
												revenueList.push(response);
												this.setState({
														moviesList: revenueList
												});

                    }).catch( error => {
                        console.log(error);
                    })
                ));
            }

            this.props.fetchTopGrossing({ posts: response.data, 'type': 'TOP_GROSSING' });
        }).catch( error => {
            console.log( error );
        });
        console.log(revenueMovieList);
    }

		render() {
				console.log('====this.state.moviesList====', this.state.moviesList);
				let topGrossing = [];
				this.state.moviesList.map( result => {
						topGrossing.push(<tr key={result.data.title}>
							<td>{ result.data.title }</td>
							<td>{ formatter.format((result.data.revenue)) }</td>
							</tr>)
				});
				return(
						<table className="table table-condensed">
							<tbody>
								{topGrossing}
							</tbody>
						</table>
				);
		}
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTopGrossing : (data) => dispatch(data)
    }
};

export default connect(null, mapDispatchToProps)(TopGrossing);