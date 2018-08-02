import React, { Component } from 'react';
import Aux from '../HOCs/Aux';
import { Link } from 'react-router-dom';

class Footer extends Component {
		render() {
				return(
						<Aux>
								<footer className="footer">
		                <div className="container">
		                    <div className="row">
		                        <div className="col-md-5">
		                            <div className="row">
		                                <div className="col-12 offset-md-3">
		                                    <h3>Nextrr</h3>
		                                    <ul className="list-unstyled">
		                                        <li><Link to="disclaimer">Disclaimer</Link></li>
		                                        <li><a href="">Credits</a></li>
		                                        <li><a href="">Contact Us</a></li>
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
				);
		}
}

export default Footer;