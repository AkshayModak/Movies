import React from 'react';
import Aux from './HOCs/Aux';
import Navbar from './containers/navbar';
import { Link } from 'react-router-dom';

class Error extends React.Component {
		render() {
				return (
						<Aux>
							<Navbar/>
							<div className="container center text-center" style={{ backgroundColor: 'transparent', color: 'white' }}>
								<p style={{ fontSize: '40px' }}><span style={{ fontSize: '100px' }}>OOPS!</span> Looks like you are lost!</p>
								<p style={{ fontSize: '40px' }}>Click Here and we will get you somewhere adventures!</p>
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
}

export default Error;