import React from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import './style.css';
import Aux from '../HOCs/Aux';


class Navbar extends React.Component {

		state = {
				searchQuery : null
		}

		handleChange(event) {
			//because setState is aynchronous, need to call callback function to setState synchronously.
		  this.setState({searchQuery: event.target.value
		  }, () => {});
		}

		formHandler(event) {
				this.props.history.push("/search/" + this.state.searchQuery);
		}

		render() {
				return (
						<Aux>
							<nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ padding: '0', backgroundColor: '#06151E'}}>
								<div className="container" style={{ marginTop: '0', backgroundColor: '#06151E' }}>
			            <NavLink className="navbar-brand" to="/" exact style={{ color: 'white', padding: '10px' }}>Nextrr</NavLink>
			            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
			              <span className="navbar-toggler-icon"></span>
			            </button>
			            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
			              <ul className="navbar-nav" style={{ padding: '10px', width: '100%' }}>
			                <NavLink to="/" exact className="nav-item nav-link" activeStyle={{ color: 'red'}} style={{ color: 'white' }}>
			                  Home
			                </NavLink>
			                <li className="nav-item dropdown">
			                  <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: 'white' }}>
			                    Television
			                  </a>
			                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
			                    <Link className="dropdown-item" to="/television/popular">Popular</Link>
			                    <Link className="dropdown-item" to="/television/top-rated">Top Rated</Link>
			                    <Link className="dropdown-item" to="/television/airing-today">Airing Today</Link>
			                    <Link className="dropdown-item" to="/television/on-air">On Air</Link>
			                  </div>
			                </li>
			                <li className="nav-item dropdown">
			                  <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: 'white' }}>
			                    Movies
			                  </a>
			                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
			                    <Link className="dropdown-item" to="/movies/upcoming">Upcoming</Link>
			                    <Link className="dropdown-item" to="/movies/in-theatres">In Theatres</Link>
			                    <Link className="dropdown-item" to="/movies/top-rated">Top Rated</Link>
			                    <Link className="dropdown-item" to="/movies/popular">Popular</Link>
			                  </div>
			                </li>
			                <NavLink to="/actors" className="nav-item nav-link" exact activeStyle={{ color: 'red' }} style={{ color: 'white' }}>
			                      Actors
			                </NavLink>
			              </ul>
			            </div>
		            </div>
		          </nav>
		          <nav class="navbar navbar-toggleable-sm bg-inverse navbar-inverse fixed-top" style={{ marginTop: '60px', backgroundColor: 'white', padding: '0', zIndex: 998 }}>
		            <div className="container"  style={{ marginTop: '0' }}>
		              <form onSubmit={this.formHandler.bind(this)} style={{ width: '100%' }}>
		                <div style={{ width: '100%' }} className="input-group">
			                <input type="text" onChange={this.handleChange.bind(this)} class="form-control rounded-0 search" id="ser-input" placeholder="Search for movies, television shows, people...." style={{ border:'0' }} autocomplete="off"/>
			                <div class="input-group-append">
			                  <Link to={"/search/" + this.state.searchQuery} class="btn btn-outline-secondary" style={{ border: '0' }}><i class="fa fa-search" aria-hidden="true"></i></Link>
			                </div>
		                </div>
	                </form>
		            </div>
		          </nav>
		        </Aux>
				);
		}
}


export default withRouter(Navbar);