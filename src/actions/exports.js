import * as actionTypes from './actionTypes';

export const movieDetails = () => {
		console.log('Inside exports', movieDetails);
		return {
				type: actionTypes.MOVIE_DETAILS
		};
}