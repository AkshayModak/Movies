import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.css';
import PosterPlaceholder from '../images/poster-placeholder.png';
import Aux from '../HOCs/Aux';

class Navbar extends Component {

		state = {
				movies : []
		};

		componentWillReceiveProps(nextProps) {
				this.setState({
            movies: nextProps.movies
        });
		}

		render() {
				return (
						<Aux>
							<nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
	              <NavLink className="navbar-brand" to="/" exact style={{ color: 'white' }}>Movie Cosmos</NavLink>
	              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
	                <span className="navbar-toggler-icon"></span>
	              </button>
	              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
	                <div className="navbar-nav">
	                  <NavLink to="/" exact className="nav-item nav-link" activeStyle={{ color: '#fa923f', textDecoration: 'underline'}} style={{ color: 'white' }}>
	                    Home
	                  </NavLink>
	                  <NavLink to="/actors" className="nav-item nav-link" exact activeStyle={{ color: '#fa923f', textDecoration: 'underline'}} style={{ color: 'white' }}>
	                        Actors
	                  </NavLink>
	                </div>
	              </div>
	            </nav>
            </Aux>
				);
		}
}

const mapStateToProps = state => {
		return {
				movies : state.posts
		};
}

export default connect(mapStateToProps)(Navbar);