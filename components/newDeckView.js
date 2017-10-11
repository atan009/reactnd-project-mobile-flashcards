import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'
import { purple } from '../utils/colors'


function onPressLearnMore () {
	console.log("pressed")
}

class NewDeckView extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = { text: '' };
	}


  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.text}>What is the title of your new deck?</Text>
        <TextInput
	        style={styles.input}
	        onChangeText={(text) => this.setState({text})}
	        value={this.state.text}
	        placeholder="Deck Title"
	    />
	    <TouchableOpacity onPress={onPressLearnMore}>
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

function mapStateToProps(deck) {
	return {
		deck
	}
}

export default connect(mapStateToProps)(NewDeckView)