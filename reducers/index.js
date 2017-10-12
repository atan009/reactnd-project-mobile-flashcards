import {
	GET_DECKS,
	SAVE_DECK_TITLE
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

		case SAVE_DECK_TITLE:
			var tempDecks = state.decks
			tempDecks.push(action.title.text)
			return {
				...state,
				decks: tempDecks,
				decksIsEmpty: false
			}

		default:
			return state
	}
}

export default flashCards