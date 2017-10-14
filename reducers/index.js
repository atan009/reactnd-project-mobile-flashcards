import {
	GET_DECKS,
	GET_DECK,
	SAVE_DECK_TITLE,
} from '../actions'

const initialState = {
	decks: [],
	decksIsEmpty: true,
	curDeck: null
}

function flashCards (state = initialState, action) {
	switch (action.type) {
		case GET_DECKS:
			return {
				...state
			}

		case GET_DECK:
			console.log(action)
			var tempDeck
			for (var i = 0; i < state.decks.length; i++) {
				if (state.decks[i].key === action.key) {
					tempDeck = state.decks[i]
				}
			}

			return {
				...state,
				curDeck: tempDeck

			}

		case SAVE_DECK_TITLE:
			var tempDecks = state.decks

			var tempDeck = {
				title: action.title.text,
				cards: [],
				key: Date.now()
			}
			
			tempDecks.push(tempDeck)
			
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