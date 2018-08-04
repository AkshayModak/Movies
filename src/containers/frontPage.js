import React, { Component } from 'react';
import MovieContainer from './movies/upcoming/movieContainer';
import InTheatres from './movies/upcoming/InTheatres';
import Aux from '../HOCs/Aux';
import { Link } from 'react-router-dom';
import PopularTV from './television/popularTV';
import Footer from './footer';
import OuterNavbar from './outernavbar';

class FrontPage extends Component {

		componentWillMount() {
				document.title = 'Home - Nextrr';
		}

		render() {
			return (
				<Aux>
					<OuterNavbar />
					<div className="row margin-0">
						<div className="col-xl-12">
			        <div className="card front-cards">
			          <div className="card-header">
			            <ul className="list-inline margin-bottom-0">
			              <li className="list-inline-item padding-top-7">In Theatres</li>
			              <li className="list-inline-item float-right"><Link to="/movies/in-theatres" className="btn btn-light float-right">View All</Link></li>
			            </ul>
			          </div>
			          <div className="card-body padding-bottom-0">
			            <InTheatres showTotal={6} hidePagination={true}/>
			          </div>
			        </div>
			        <div className="card front-cards">
                <div className="card-header">
                  <ul className="list-inline margin-bottom-0">
                    <li className="list-inline-item padding-top-7">Upcoming Movies</li>
                    <li className="list-inline-item float-right"><Link to="/movies/upcoming" className="btn btn-light float-right">View All</Link></li>
                  </ul>
                </div>
                <div className="card-body padding-bottom-0">
                  <MovieContainer showTotal={6} hidePagination={true} isUpcoming={true}/>
                </div>
              </div>
			        <div className="card front-cards">
			          <div className="card-header">
			            <ul className="list-inline margin-bottom-0">
			              <li className="list-inline-item padding-top-7">Popular TV</li>
			              <li className="list-inline-item float-right"><Link to="/television/popular" className="btn btn-light float-right">View All</Link></li>
			            </ul>
			          </div>
			          <div className="card-body padding-bottom-0">
			            <PopularTV showTotal={6} hidePagination={true}/>
			          </div>
			        </div>
						</div>
					</div>
					<Footer />
				</Aux>
			);
		}

}

export default FrontPage;
