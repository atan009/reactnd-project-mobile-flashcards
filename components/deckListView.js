import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'

class DeckListView extends React.Component {
  render() {
  	const { flashCards } = this.props
  	console.log(flashCards)

    return (
      <View style={styles.container}>
        {(flashCards.decksIsEmpty && <Text>Start a deck</Text>) ||
        	<Text>Hello World</Text>
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
    justifyContent: 'center',
  },
});

function mapStateToProps(flashCards) {
	return {
		flashCards
	}
}

export default connect(mapStateToProps)(DeckListView)