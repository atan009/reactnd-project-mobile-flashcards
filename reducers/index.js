import {
	GET_DECKS,
	GET_DECK,
	SAVE_DECK_TITLE,
	ADD_CARD_TO_DECK,
	DELETE_DECK,
} from '../actions'

const initialState = {
	decks: [],
	decksIsEmpty: true,
	curDeck: null,
	doneLoading: false
}

function flashCards (state = initialState, action) {
	switch (action.type) {
		case GET_DECKS:
			console.log(action)
			if (action.decks !== null) {	
				state = action.decks
			}
			else {
				state.doneLoading = true
			}
			return {
				...state,
			}

		case GET_DECK:
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

		case DELETE_DECK:
			return {
				...state,
				decks: state.decks.filter((deck) => deck.key !== action.key),
				decksIsEmpty: state.decks.length === 0 ? true : false
			}

		default:
			return state
	}
}

export default flashCards