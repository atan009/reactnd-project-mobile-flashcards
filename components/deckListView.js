import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { gray } from '../utils/colors'

class DeckListView extends React.Component {
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



    return (
      <View style={styles.container}>
        {(flashCards.decksIsEmpty && <Text>Create a deck</Text>) ||
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

export default connect(mapStateToProps)(DeckListView)