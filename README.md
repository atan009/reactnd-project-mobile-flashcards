This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

The most recent version of the guide is available [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).

## How to install and run
Clone the repository or download the zip and extract the files

* Install and run the commands
    - `cd reactnd-project-mobile-flashcards`
    - `yarn install`
    - `yarn run`
   
build the project [Expo](https://expo.io/) and run on your phone

## Using the app and views
* The app initially starts in the Deck List view which displays where your list of decks
* The New Deck View has an input and a submit button
* Selecting a deck or creating a new one will lead to the Individual Deck View
* The Individual Deck view can to the views: Add Card, Quiz, Delete Cards and Delete Deck

## Creating a Deck
* The New Deck tab allows you to create a deck with your desired title
* simply input anything into the line and press submit

## Adding Cards
* Upon creating a new deck or selecting an old one, will move you to the individual deck view
* On the display will be the deck title, number of cards and a list of buttons
* Press the Add Card button
* Write a question and answer then submit the card to add it to the list

## Quiz View
* From the Individual Deck View, press the Start Quiz button
* In the top left, there is a progress meter of answered cards
* The center will always display the question first
* By pressing on the center, the card will display the answer
* Press either correct or incorrect to record your progress
* After going through all the cards, a result will display how many card you got correct
* a restart button will also appear allowing you to restart

## Deleting Cards
* From the Individual Deck View, press the Delete Cards button to move to the Card List View
* A list of cards in that deck will be displayed
* Press on a card open up a delete confirmation
* Press Yes to delete the card or press no to go back to the Card List View

## Deleting Decks
* From the Individual Deck View, press the Delete Deck button
* A confirmation will appear
* Press Yes to delete the deck or No to close the confirmation

## Platforms Tested On
* Samsung Galaxy S7
