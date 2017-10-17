import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import { connect } from 'react-redux'
import { purple, gray } from '../utils/colors'
import { addCardToDeck } from '../actions'

class addCard extends React.Component {
	static navigationOptions = ({ navigation }) => {
    	return {
  	  		title: 'Add Card'
    	}
  	}

  	submitCard(question, answer) {
  		Keyboard.dismiss()
  		this.props.addCard(this.state)
  		this.setState({question: '',
  			answer: ''})
  	}

  	constructor(props) {
	    super(props);
	    this.state = { question: '',
	    answer: '' };
	}

	render() {
		var self = this
		const { flashCards } = this.props
		return (
			<View style={styles.container}>
				<TextInput
			        style={styles.input}
			        onChangeText={(question) => this.setState({question: question})}
			        value={this.state.question}
			        multiline={true}
			        placeholder="Card Question"
			    />
			    <TextInput
			        style={styles.input}
			        onChangeText={(answer) => this.setState({answer: answer})}
			        value={this.state.answer}
			        multiline={true}
			        placeholder="Card Answer"
			    />
			    <TouchableOpacity style={{flex:2}} onPress={this.submitCard.bind(this,self.state.question, self.state.answer)}>
			    	<Text style={styles.buttonText}>Submit</Text>
			    </TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
  	fontSize: 20,
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
})

function mapStateToProps(flashCards) {
	return {
		flashCards
	}
}

function mapDispatchToProps(dispatch) {
	return {
		addCard: (card) => dispatch(addCardToDeck(card))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(addCard)