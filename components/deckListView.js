import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'


class DeckListView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>deckListView!</Text>
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

function mapStateToProps(decks) {
	return {
		decks
	}
}

export default connect(mapStateToProps)(DeckListView)