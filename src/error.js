import React from 'react';
import Aux from './HOCs/Aux';
import Navbar from './containers/navbar';
import Footer from './containers/footer';
import { Link } from 'react-router-dom';
import errorImage from './images/error.png';

class Error extends React.Component {
		render() {
				return (
						<Aux>
							<div className="container disclaimer text-center" style={{ backgroundColor: 'transparent', color: 'white' }}>
								<img src={errorImage} style={{ width: '200px', height: '200px', marginTop: '50px' }}/>
								<h2 style={{ paddingTop: '20px' }}>Oh no!</h2>
								<p>Looks like you are lost.</p>
								<p><Link to="/" class="no-decoration">Click Here</Link> and we will take you back.</p>
							</div>
							<Footer />
						</Aux>
				)
		}
}

export default Error;