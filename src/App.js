import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import MovieDetails from './containers/movies/movieDetails';
import DiscoverMovies from './containers/movies/discover/movies';
import Aux from './HOCs/Aux1';
import FrontPage from './containers/frontPage';
import InTheatres from './containers/movies/upcoming/InTheatres';
import PopularTV from './containers/television/popularTV';
import Person from './containers/people/person';
import PopularPeople from './containers/people/popular';
import Television from './containers/television/discover/tv';
import TelevisionDetails from './containers/television/tvDetails';
import SearchByGenre from './containers/television/discover/genres';
import SearchByNetwork from './containers/television/discover/searchByNetwork';
import Error from './error';
import Navbar from './containers/navbar';
import ReactGA from 'react-ga';
import Search from './containers/search';
import Disclaimer from './static/disclaimer';
import Credits from './static/credits';
import About from './static/aboutus';

class App extends Component {

		componentDidMount() {
				document.body.style.background = '#06151E';
				ReactGA.initialize('UA-123163652-1');
		}

		render() {
        ReactGA.pageview(window.location.pathname);
				return(
								<Aux>
										<Navbar />
										<Switch>
												<Route path='/' exact component={FrontPage} />
		                    <Route path='/movie-details/:id?' exact component={MovieDetails} />
		                    <Route path='/tv-details/:tvid?' exact component={TelevisionDetails} />
		                    <Route path='/popular-tv' exact component={PopularTV} />
		                    <Route path='/in-theatre' exact component={InTheatres} />
		                    <Route path='/movies/:id' exact component={DiscoverMovies} />
		                    <Route path='/person/:id' exact component={Person} />
		                    <Route path='/actors' exact component={PopularPeople} />
		                    <Route path='/television/:id' exact component={Television} />
		                    <Route path='/television/genre/:id' exact component={SearchByGenre} />
		                    <Route path='/television/network/:id/:name?' exact component={SearchByNetwork} />
		                    <Route path='/search/:query' exact component={Search} />
		                    <Route path='/disclaimer' exact component={Disclaimer} />
		                    <Route path='/credits' exact component={Credits} />
		                    <Route path='/about' exact component={About} />
		                    <Route component={Error}/>
		                </Switch>
                </Aux>
				);
		}
}

export default App;