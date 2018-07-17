import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import MovieDetails from './containers/movies/movieDetails';
import MovieContainer from './containers/movies/upcoming/movieContainer';
import Aux from './HOCs/Aux';
import FrontPage from './containers/frontPage';
import InTheatres from './containers/movies/upcoming/InTheatres';
import PopularTV from './containers/television/popularTV';
import Person from './containers/people/person';
import PopularPeople from './containers/people/popular';

class App extends Component {
		render() {
				return(
						<BrowserRouter>
								<Aux>
										<Switch>
												<Route path='/' exact component={FrontPage} />
		                    <Route path='/movie-details' exact component={MovieDetails} />
		                    <Route path='/popular-tv' exact component={PopularTV} />
		                    <Route path='/in-theatre' exact component={InTheatres} />
		                    <Route path='/discover' exact component={MovieContainer} />
		                    <Route path='/person' exact component={Person} />
		                    <Route path='/actors' exact component={PopularPeople} />
		                    <Route render={() => <h1>Not found</h1>}/>
		                </Switch>
                </Aux>
						</BrowserRouter>
				);
		}
}

export default App;