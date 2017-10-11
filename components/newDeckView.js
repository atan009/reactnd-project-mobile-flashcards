import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'

class NewDeckView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>newDeckView!</Text>
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

function mapStateToProps(deck) {
	return {
		deck
	}
}

export default connect(mapStateToProps)(NewDeckView)