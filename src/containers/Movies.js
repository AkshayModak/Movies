import React, { Component } from 'react';
import Aux from '../HOCs/Aux';
import MovieCards from './movies/movieCards';
import { connect } from 'react-redux';
import './style.css';
import ItemsCarousel from 'react-items-carousel';

class Users extends Component {

		state = {
				activeItemIndex: 1,
				movies: []
		}

		componentWillReceiveProps(nextProps) {
        if ( nextProps.movieDetails ) {
              const movie_results = nextProps.movieDetails.results;

              if (movie_results && this.props.showTotal) {
                  this.setState({ movies: movie_results});
              }
        }
    }


	  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

		render() {
			const {
          activeItemIndex
        } = this.state;

				let movie_result =  (
            <div style={{ width: '100%' }}> <i class="fa fa-spinner fa-spin fa-5x fa-fw" style={{ color: 'white', marginLeft: '50%', position: 'relative', top: '50%'}}/> </div>
       );
				let movie_result_small = <div className="loader"></div>
				let movie_result_xs = <div className="loader"></div>

        if ( this.state.movies.length > 0 ) {
            const movie_results = this.state.movies;
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
                          children={[
															<MovieCards data={movie_results[0]} selectedMovie={movie_results[0].id} key={movie_results[0].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
															<MovieCards data={movie_results[1]} selectedMovie={movie_results[1].id} key={movie_results[1].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
															<MovieCards data={movie_results[2]} selectedMovie={movie_results[2].id} key={movie_results[2].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
															<MovieCards data={movie_results[3]} selectedMovie={movie_results[3].id} key={movie_results[3].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
															<MovieCards data={movie_results[4]} selectedMovie={movie_results[4].id} key={movie_results[4].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
															<MovieCards data={movie_results[5]} selectedMovie={movie_results[5].id} key={movie_results[5].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                              <MovieCards data={movie_results[6]} selectedMovie={movie_results[6].id} key={movie_results[6].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                              <MovieCards data={movie_results[7]} selectedMovie={movie_results[7].id} key={movie_results[7].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                              <MovieCards data={movie_results[8]} selectedMovie={movie_results[8].id} key={movie_results[8].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                              <MovieCards data={movie_results[9]} selectedMovie={movie_results[9].id} key={movie_results[9].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                              <MovieCards data={movie_results[10]} selectedMovie={movie_results[10].id} key={movie_results[10].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                              <MovieCards data={movie_results[11]} selectedMovie={movie_results[11].id} key={movie_results[11].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                              <MovieCards data={movie_results[12]} selectedMovie={movie_results[12].id} key={movie_results[12].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                              <MovieCards data={movie_results[13]} selectedMovie={movie_results[13].id} key={movie_results[13].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                              <MovieCards data={movie_results[14]} selectedMovie={movie_results[14].id} key={movie_results[14].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                              <MovieCards data={movie_results[15]} selectedMovie={movie_results[15].id} key={movie_results[15].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                              <MovieCards data={movie_results[16]} selectedMovie={movie_results[16].id} key={movie_results[16].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
	                            <MovieCards data={movie_results[17]} selectedMovie={movie_results[17].id} key={movie_results[17].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
	                            <MovieCards data={movie_results[18]} selectedMovie={movie_results[18].id} key={movie_results[18].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>
                          ]}
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
                            children={[
                                <MovieCards data={movie_results[0]} selectedMovie={movie_results[0].id} key={movie_results[0].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                                <MovieCards data={movie_results[1]} selectedMovie={movie_results[1].id} key={movie_results[1].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                                <MovieCards data={movie_results[2]} selectedMovie={movie_results[2].id} key={movie_results[2].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                                <MovieCards data={movie_results[3]} selectedMovie={movie_results[3].id} key={movie_results[3].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                                <MovieCards data={movie_results[4]} selectedMovie={movie_results[4].id} key={movie_results[4].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                                <MovieCards data={movie_results[5]} selectedMovie={movie_results[5].id} key={movie_results[5].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                                <MovieCards data={movie_results[6]} selectedMovie={movie_results[6].id} key={movie_results[6].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                                <MovieCards data={movie_results[7]} selectedMovie={movie_results[7].id} key={movie_results[7].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                                <MovieCards data={movie_results[8]} selectedMovie={movie_results[8].id} key={movie_results[8].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                                <MovieCards data={movie_results[9]} selectedMovie={movie_results[9].id} key={movie_results[9].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                                <MovieCards data={movie_results[10]} selectedMovie={movie_results[10].id} key={movie_results[10].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                                <MovieCards data={movie_results[11]} selectedMovie={movie_results[11].id} key={movie_results[11].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                                <MovieCards data={movie_results[12]} selectedMovie={movie_results[12].id} key={movie_results[12].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                                <MovieCards data={movie_results[13]} selectedMovie={movie_results[13].id} key={movie_results[13].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
                                <MovieCards data={movie_results[14]} selectedMovie={movie_results[14].id} key={movie_results[14].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>
                            ]}
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
	                          children={[
	                              <MovieCards data={movie_results[0]} selectedMovie={movie_results[0].id} key={movie_results[0].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
	                              <MovieCards data={movie_results[1]} selectedMovie={movie_results[1].id} key={movie_results[1].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
	                              <MovieCards data={movie_results[2]} selectedMovie={movie_results[2].id} key={movie_results[2].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
	                              <MovieCards data={movie_results[3]} selectedMovie={movie_results[3].id} key={movie_results[3].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
	                              <MovieCards data={movie_results[4]} selectedMovie={movie_results[4].id} key={movie_results[4].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
	                              <MovieCards data={movie_results[5]} selectedMovie={movie_results[5].id} key={movie_results[5].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
	                              <MovieCards data={movie_results[6]} selectedMovie={movie_results[6].id} key={movie_results[6].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
	                              <MovieCards data={movie_results[7]} selectedMovie={movie_results[7].id} key={movie_results[7].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
	                              <MovieCards data={movie_results[8]} selectedMovie={movie_results[8].id} key={movie_results[8].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
	                              <MovieCards data={movie_results[9]} selectedMovie={movie_results[9].id} key={movie_results[9].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
	                              <MovieCards data={movie_results[10]} selectedMovie={movie_results[10].id} key={movie_results[10].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
	                              <MovieCards data={movie_results[11]} selectedMovie={movie_results[11].id} key={movie_results[11].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
	                              <MovieCards data={movie_results[12]} selectedMovie={movie_results[12].id} key={movie_results[12].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
	                              <MovieCards data={movie_results[13]} selectedMovie={movie_results[13].id} key={movie_results[13].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>,
	                              <MovieCards data={movie_results[14]} selectedMovie={movie_results[14].id} key={movie_results[14].id} isUpcoming={this.props.isUpcoming} isTv={this.props.isTv}/>
	                          ]}
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