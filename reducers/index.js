import {
	GET_DECKS
} from '../actions'

const initialState = {
	decks: [],
	decksIsEmpty: true,
}

function flashCards (state = initialState, action) {
	switch (action.type) {
		case GET_DECKS:
			return {
				...state
			}

		default:
			return state
	}
}

export default flashCards