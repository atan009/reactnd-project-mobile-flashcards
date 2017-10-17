import {
	GET_DECKS,
	GET_DECK,
	SAVE_DECK_TITLE,
	ADD_CARD_TO_DECK,
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
				key: action.key
			}
			
			tempDecks.push(tempDeck)
			
			return {
				...state,
				decks: tempDecks,
				decksIsEmpty: false
			}

		case ADD_CARD_TO_DECK:
			tempDecks = state.decks
			for (i = 0; i < tempDecks.length; i++) {
				if (state.curDeck.key === tempDecks[i].key) {
					tempDecks[i].cards.push(action.card)
					tempDeck = tempDecks[i]
				}
			}
			return {
				...state,
				curDeck: tempDeck,
				decks: tempDecks
			}

		default:
			return state
	}
}

export default flashCards