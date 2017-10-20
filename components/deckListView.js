import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import { gray } from '../utils/colors'
import { getDecks } from '../actions'

class DeckListView extends React.Component {
	state = {
		firstLaunch: true
	}

	componentDidMount() {
		var self = this
		if (this.state.firstLaunch) {
			AsyncStorage.getItem('storageUID')
			.then((result) => {
				self.props.getDecks(JSON.parse(result))
				this.setState({firstLaunch: false})
			})
			
		}
	}

	renderItem(item) {
		return (
			<TouchableOpacity key={item.key} onPress={() => this.props.navigation.navigate (
				'DeckDetails',
				{key: item.key,
					title: item.title},
				)} style={styles.deck}>
		    	<Text style={styles.deckTitle}>{item.title}</Text>
		    	<Text style={styles.deckInfo}>{item.cards.length} cards</Text>
		    </TouchableOpacity>
		)
	}

  render() {
  	const { flashCards } = this.props

  	if (!flashCards.doneLoading && this.state.firstLaunch) {
  		return <Text>Loading previous data </Text>
  	}
  	else {
    return (
      <View style={styles.container}>
        {(flashCards.doneLoading && flashCards.decksIsEmpty && <Text>Create a deck</Text>) ||
        	<FlatList
        		data={flashCards.decks}
        		extraData={flashCards}
        		renderItem={({ item }) => this.renderItem(item)}
        		style={styles.list}
        	/>
        }
      </View>
    );
	}
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
  deck: {
  	alignSelf: 'stretch',
  	borderWidth: 0.5,
  	borderTopWidth: 0
  },
  deckTitle: {
  	textAlign: 'center',
  	fontSize: 24
  },
  deckInfo: {
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
		getDecks: (decks) => dispatch(getDecks(decks))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckListView)