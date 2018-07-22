import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.css';
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
	                  <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: 'white' }}>
                        Movies
                      </a>
                      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to="/discover/upcoming" href="#">Upcoming</Link>
                        <Link className="dropdown-item" to="/discover/running" href="#">In Theatres</Link>
                        <Link className="dropdown-item" to="/discover/top-rated" href="#">Top Rated</Link>
                        <Link className="dropdown-item" to="/discover/popular" href="#">Popular</Link>
                      </div>
                    </li>
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