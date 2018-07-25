import React, { Component } from 'react';
import Aux from '../HOCs/Aux';
import MovieCards from './movies/movieCards';
import { connect } from 'react-redux';
import './style.css';
import ItemsCarousel from 'react-items-carousel';
import Loader from '../utility/loader';

class Users extends Component {

		state = {
				activeItemIndex: 1,
				movies: []
		}

		componentWillReceiveProps(nextProps) {
        if ( nextProps.movieDetails ) {
              const movie_results = nextProps.movieDetails.results;

              if (movie_results) {
                  this.setState({ movies: movie_results});
              }
        }
    }


	  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

		render() {
			const {
          activeItemIndex
        } = this.state;

				let movie_result =  (<Loader />);
				let movie_result_small = (<Loader />);
				let movie_result_xs = (<Loader />);

        if ( this.state.movies.length > 0 ) {
            const movie_results = this.state.movies;

						const movie_cards = [];
						for (let i = 0; i < 18; i++) {
								movie_cards.push(<MovieCards data={movie_results[i]} key={movie_results[i].id} />)
						}

						if (this.props.showTotal) {
								movie_result = (
                    <ItemsCarousel
                          numberOfCards={10}
                          freeScrolling={false}
                          showSlither={true}
                          slidesToScroll={5}
                          firstAndLastGutter={false}
                          gutter={10}

                          enablePlaceholder
                          minimumPlaceholderTime={2000}
                          numberOfPlaceholderItems={6}
                          appShellItem={'<div></div>'}

										      rightChevron={<i className="fa fa-chevron-right fa-lg" style={{ color: 'white' }}></i>}
										      leftChevron={<i className="fa fa-chevron-left fa-lg" style={{ color: 'white' }}></i>}
                          chevronWidth={20}
                          outsideChevron={true}

                          springConfig={{"stiffness":170,"damping":26}}

										      requestToChangeActive={this.changeActiveItem}
										      activeItemIndex={activeItemIndex}
                          activePosition={'center'}
                          children={movie_cards}
                        />
								)

								movie_result_small = (
                      <ItemsCarousel
                            numberOfCards={3}
                            freeScrolling={false}
                            showSlither={true}
                            slidesToScroll={3}
                            firstAndLastGutter={false}
                            gutter={10}

                            enablePlaceholder
                            minimumPlaceholderTime={2000}
                            numberOfPlaceholderItems={6}
                            appShellItem={'<div></div>'}

                            rightChevron={<i className="fa fa-chevron-right"></i>}
                            leftChevron={<i className="fa fa-chevron-left"></i>}
                            chevronWidth={20}
                            outsideChevron={true}

                            springConfig={{"stiffness":170,"damping":26}}

                            requestToChangeActive={this.changeActiveItem}
                            activeItemIndex={activeItemIndex}
                            activePosition={'center'}
                            children={movie_cards}
                          />
                  )


                  movie_result_xs = (
	                    <ItemsCarousel
	                          numberOfCards={2}
	                          freeScrolling={false}
	                          showSlither={true}
	                          slidesToScroll={2}
	                          firstAndLastGutter={false}
	                          gutter={10}

	                          enablePlaceholder
	                          minimumPlaceholderTime={2000}
	                          numberOfPlaceholderItems={6}
	                          appShellItem={'<div></div>'}

	                          rightChevron={<i className="fa fa-chevron-right"></i>}
	                          leftChevron={<i className="fa fa-chevron-left"></i>}
	                          chevronWidth={20}
	                          outsideChevron={true}

	                          springConfig={{"stiffness":170,"damping":26}}

	                          requestToChangeActive={this.changeActiveItem}
	                          activeItemIndex={activeItemIndex}
	                          activePosition={'center'}
	                          children={movie_cards}
	                        />
	                )
						} else if (movie_results) {
								movie_result = movie_results.map( result => { //.filter((i, index) => (index < 4))
                    return (
                        <MovieCards data={result} selectedMovie={result.id} key={result.id} isTv={this.props.isTv}/>
                    )
                });
						}
        }

				return (
						<Aux>
							<div className="justify-content-md-center">
								<div className="d-none d-md-block">
									{movie_result}
								</div>
								<div className="d-none d-sm-block d-md-none">
                  {movie_result_small}
                </div>
                <div className="d-block d-sm-none">
                  {movie_result_xs}
                </div>
							</div>
            </Aux>
				);
		}
}

const mapStateToProps = state => {
		return {
				selectedMovie : state.selectedMovie
		}
}

export default connect(mapStateToProps)(Users);