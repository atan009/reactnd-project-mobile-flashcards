export const GET_DECKS = 'GET_DECKS'
export const GET_DECK = 'GET_DECK'
export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const DELETE_DECK = 'DELETE_DECK'

export function getDecks (decks) {
	return {
		type: GET_DECKS,
		decks
	}
}

export function getDeck (key) {
	return {
		type: GET_DECK,
		key
	}
}

export function saveDeckTitle (title, key) {
	return {
		type: SAVE_DECK_TITLE,
		title,
		key
	}
}

export function addCardToDeck (card) {
	return {
		type: ADD_CARD_TO_DECK,
		card
	}
}

export function deleteDeck(key) {
	return {
		type: DELETE_DECK,
		key
	}
}