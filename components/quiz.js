import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { red, green, white } from '../utils/colors'
import { 
	getDailyReminderValue,
	clearLocalNotification,
	setLocalNotification} from '../utils/helper'

class quiz extends React.Component {
	static navigationOptions = ({ navigation }) => {
    	return {
  	  		title: 'Quiz'
    	}
  	}

  	constructor(props) {
	    super(props);
	    const { flashCards } = this.props
	    this.state = { 
	    	Q: 0,
	    	correct: 0,
	    	display: flashCards.curDeck.cards.length ? flashCards.curDeck.cards[0].question : '',
	    	side: "Question" };
	}

	flipSide() {
		const { flashCards } = this.props
		if (this.state.side === "Question") {
			this.setState({
				display: flashCards.curDeck.cards[this.state.Q].answer,
				side: "Answer"
			})
		} else {
			this.setState({
				display: flashCards.curDeck.cards[this.state.Q].question,
				side: "Question"
			})
		}
	}

	correct() {
		const { flashCards } = this.props
		this.setState({
			Q: this.state.Q + 1,
			correct: this.state.correct + 1,
			display: flashCards.curDeck.cards[this.state.Q].question,
			side: "Question"
		})
	}

	incorrect() {
		const { flashCards } = this.props
		this.setState({
			Q: this.state.Q + 1,
			display: flashCards.curDeck.cards[this.state.Q].question,
			side: "Question"
		})
	}

	restart() {
		const { flashCards } = this.props
		this.setState({
			Q: 0,
			correct: 0,
			display: flashCards.curDeck.cards[0].question,
			side: "Question"
		})
		clearLocalNotification()
		.then(setLocalNotification)
	}

	render() {
		var self = this
		const { flashCards } = this.props
		return (
			<View style={{flex: 1}}>
				<View>
					{(!flashCards.curDeck.cards.length && <Text>You need to add some cards</Text>) ||
						<Text>Flashcards completed: {this.state.Q}/{flashCards.curDeck.cards.length}</Text>
					}
				</View>
				{flashCards.curDeck.cards.length > 0 && this.state.Q !== flashCards.curDeck.cards.length &&
					<View style={styles.container}>
							<TouchableOpacity onPress={this.flipSide.bind(this)}>
								<Text style={styles.display}>{this.state.display}</Text>
								<Text style={styles.side}>{this.state.side}</Text>
							</TouchableOpacity>

							<TouchableOpacity style={styles.correct} onPress={this.correct.bind(this)}>
				        		<Text style={styles.text}>Correct</Text>
					        </TouchableOpacity>

					        <TouchableOpacity style={styles.incorrect} onPress={this.incorrect.bind(this)}>
					        	<Text style={styles.text}>Incorrect</Text>
					        </TouchableOpacity>
					</View>

					|| this.state.Q === flashCards.curDeck.cards.length && flashCards.curDeck.cards.length > 0 && 
					<View style={styles.container}>
						<Text style={styles.display}>Results</Text>
						<Text>{this.state.correct}/{flashCards.curDeck.cards.length}</Text>
						<TouchableOpacity style={styles.correct} onPress={this.restart.bind(this)}>
			        		<Text style={styles.text}>Restart</Text>
				        </TouchableOpacity>
					</View>
				}
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
  display: {
  	fontSize: 50,
  	textAlign: 'center'
  },
  side: {
  	color: red,
  	textAlign: 'center'
  },
  correct: {
  	backgroundColor: green,
  	borderColor: '#000',
  	padding: 10,
  	paddingLeft: 50,
  	paddingRight: 50,
  	justifyContent: 'center',
  	alignItems: 'center',
  	borderWidth: 1,
  	borderRadius: 5,
  	marginTop: 5
  },
  incorrect: {
  	backgroundColor: red,
  	borderColor: '#000',
  	padding: 10,
  	paddingLeft: 50,
  	paddingRight: 50,
  	justifyContent: 'center',
  	alignItems: 'center',
  	borderWidth: 1,
  	borderRadius: 5,
  	marginTop: 5	
  },
  text: {
  	color: white
  }
})

function mapStateToProps(flashCards) {
	return {
		flashCards
	}
}

function mapDispatchToProps(dispatch) {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(quiz)