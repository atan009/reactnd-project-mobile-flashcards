import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import { gray, purple } from '../utils/colors'
import { getDecks } from '../actions'

class cardListView extends React.Component {
	renderItem(item) {
			return (
				<TouchableOpacity key={item.key} style={styles.card}>
			    	<Text style={styles.deckQuestion}>{item.question}</Text>
			    	<Text style={styles.deckAnswer}>{item.answer}</Text>
			    </TouchableOpacity>
			)
		}


	render() {
	  	const { flashCards } = this.props

  		console.log(this.props)
	    return (
	      <View style={styles.container}>
	        {(flashCards.doneLoading && !flashCards.curDeck.cards.length && <Text>Add some cards</Text>) ||
	        	<FlatList
	        		data={flashCards.curDeck.cards}
	        		extraData={flashCards}
	        		renderItem={({ item }) => this.renderItem(item)}
	        		style={styles.list}
	        	/>
	        }
	      </View>
	    );
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  list: {
  	flex: 1,
  	alignSelf: 'stretch'
  },
  card: {
  	alignSelf: 'stretch',
  	borderWidth: 0.5,
  	borderTopWidth: 0
  },
  deckQuestion: {
  	textAlign: 'center',
  	fontSize: 24
  },
  deckAnswer: {
  	textAlign: 'center',
  	color: gray
  },
});

function mapStateToProps(flashCards) {
	return {
		flashCards
	}
}

function mapDispatchToProps(dispatch) {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(cardListView)