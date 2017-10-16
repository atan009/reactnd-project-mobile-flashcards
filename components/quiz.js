import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { purple, gray, red } from '../utils/colors'

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
	    	side: "question" };
	}

	flipSide() {
		const { flashCards } = this.props
		if (this.state.side === "question") {
			this.setState({
				display: flashCards.curDeck.cards[this.state.Q].answer,
				side: "answer"
			})
		} else {
			this.setState({
				display: flashCards.curDeck.cards[this.state.Q].question,
				side: "question"
			})
		}
	}

	render() {
		var self = this
		const { flashCards } = this.props
		return (
			<View style={{flex: 1}}>
				<View>
					{(!flashCards.curDeck.cards.length && <Text>You need to add some cards</Text>) ||
						<Text style={styles.progress}>{this.state.Q}/{flashCards.curDeck.cards.length}</Text>
					}
				</View>
				<View style={styles.container}>
					{flashCards.curDeck.cards.length > 0 &&
						<TouchableOpacity onPress={this.flipSide.bind(this)}>
							<Text style={styles.display}>{this.state.display}</Text>
							<Text style={styles.side}>{this.state.side}</Text>
						</TouchableOpacity>
					}
				</View>
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