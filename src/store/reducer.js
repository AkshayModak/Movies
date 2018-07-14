import { updateObject } from '../actions/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    posts : [],
    selectedMovie: []
};

const reducer = ( state = initialState, action ) => {
		switch (action.type) {
				case actionTypes.MOVIE_DETAILS :
						return updateObject(action)
				case actionTypes.MOVIE_SELECTED :
						return updateObject(action)
				default :
						return state;
		}
};

export default reducer;