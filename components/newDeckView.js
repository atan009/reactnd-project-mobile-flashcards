import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import { purple } from '../utils/colors'
import {
	saveDeckTitle
} from '../actions'


class NewDeckView extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = { 
	    	text: '',
	    	key: Date.now() };
	}

	submitTitle(title) {
		var self = this
		Keyboard.dismiss()
		this.setState({text: ''})
		this.props.addDeck(title, self.state.key)
		self.props.navigation.navigate (
			'DeckDetails',
			{key: self.state.key,
				title: title.text},
			)
		AsyncStorage.setItem('storageUID', JSON.stringify(this.props.flashCards))
	}

  render() {
  	var self = this
  	// console.log(this.props)
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.text}>What is the title of your new deck?</Text>
        <TextInput
	        style={styles.input}
	        onChangeText={(text) => this.setState({text})}
	        value={this.state.text}
	        placeholder="Deck Title"
	    />
	    <TouchableOpacity onPress={this.submitTitle.bind(self,self.state)}>
	    	<Text style={styles.buttonText}>Submit</Text>
	    </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
  	// flex: 1,
  	fontSize: 24,
  	textAlign: 'center'
  },
  input: {
  	borderColor: 'gray',
  	borderWidth: 1,
  	margin: 10,
  	padding: 10,
  	alignSelf: 'stretch',
  },
  buttonText: {
  	textAlign: 'center',
  	color: purple,
  }
});

function mapStateToProps(flashCards) {
	return {
		flashCards
	}
}

function mapDispatchToProps(dispatch) {
	return {
		addDeck: (title, key) => dispatch(saveDeckTitle(title, key))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeckView)