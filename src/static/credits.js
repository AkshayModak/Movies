import React from 'react';
import Aux from '../HOCs/Aux';
import { Link } from 'react-router-dom';

const credits = () => {
		return (
				<Aux>
					<div class="container disclaimer">
            <h1>Credits</h1>

            <h3>Images</h3>
            <p>from TMDB</p>

            <h3>Movies, Television and People Details</h3>
            <p>from TMDB</p>

            <h3>Trailers</h3>
            <p>Embedded from Youtube.com</p>

            <h3>Others</h3>
            <p>All Other Images, fonts and other media are taken from public domain.</p>
          </div>
					<footer className="footer" style={{ position: 'fixed' }}>
	          <div className="container">
	              <div className="row">
	                  <div className="col-md-5">
	                      <div className="row">
	                          <div className="col-12 offset-md-3">
	                              <h3>Nextrr</h3>
	                              <ul className="list-unstyled">
	                                  <li><Link to="disclaimer">Disclaimer</Link></li>
	                                  <li><Link to="credits">Credits</Link></li>
	                                  <li><Link to="about">Contact Us</Link></li>
	                              </ul>
	                              <ul className="nav">
	                                  <li className="nav-item"><a href="" className="nav-link pl-0"><i className="fa fa-facebook fa-lg"></i></a></li>
	                                  <li className="nav-item"><a href="" className="nav-link"><i className="fa fa-twitter fa-lg"></i></a></li>
	                                  <li className="nav-item"><a href="" className="nav-link"><i className="fa fa-github fa-lg"></i></a></li>
	                                  <li className="nav-item"><a href="" className="nav-link"><i className="fa fa-instagram fa-lg"></i></a></li>
	                              </ul>
	                          </div>
	                      </div>
	                      <br />
	                  </div>
	                  <div className="col-md-2">
	                      <h5 className="text-md-right">Contact Us</h5>
	                      <hr />
	                  </div>
	                  <div className="col-md-5">
	                      <form>
	                          <fieldset className="form-group">
	                              <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email"/>
	                          </fieldset>
	                          <fieldset className="form-group">
	                              <textarea className="form-control" id="exampleMessage" placeholder="Message"></textarea>
	                          </fieldset>
	                          <fieldset className="form-group text-xs-right">
	                              <button type="button" className="btn btn-secondary-outline btn-lg">Send</button>
	                          </fieldset>
	                      </form>
	                  </div>
	              </div>
	          </div>
          </footer>
        </Aux>
		)
}

export default credits;