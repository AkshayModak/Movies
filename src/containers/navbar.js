import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './style.css';
import Aux from '../HOCs/Aux';


const navbar = () => {
		return (
				<Aux>
					<nav className="navbar navbar-expand-lg navbar-dark" style={{ padding: '0', backgroundColor: 'black' }}>
            <NavLink className="navbar-brand" to="/" exact style={{ color: 'white', padding: '10px' }}>Movie Cosmos</NavLink>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav" style={{ padding: '10px' }}>
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
              </div>
            </div>
          </nav>
        </Aux>
		);
}


export default navbar;