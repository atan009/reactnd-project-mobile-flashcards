import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDeck } from '../actions'
import { gray, white } from '../utils/colors'

class deckDetails extends Component {
	componentWillMount() {
		var self = this
		this.props.getCurDeck(this.props.navigation.state.params.key)
	}

  static navigationOptions = ({ navigation }) => {
  	const { key, title } = navigation.state.params


    return {
  	  title: `${title}`
    }
  }

  render() {
  	const { flashCards } = this.props
  	console.log(this.props)
    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>{flashCards.curDeck && flashCards.curDeck.title}</Text>
        <Text style={styles.deckInfo}>{flashCards.curDeck && flashCards.curDeck.cards.length} cards</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => this.props.navigation.navigate (
				'AddCard',
				{key: flashCards.curDeck.key},
				)}>
        	<Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quizBtn} onPress={() => this.props.navigation.navigate (
				'Quiz',
				{key: flashCards.curDeck.key},
				)}>
        	<Text style={styles.quizTxt}>Start Quiz</Text>
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
  deckTitle: {
  	textAlign: 'center',
  	fontSize: 24
  },
  deckInfo: {
  	textAlign: 'center',
  	color: gray
  },
  addBtn: {
  	backgroundColor: white,
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
  quizBtn: {
  	backgroundColor: '#000',
  	padding: 10,
  	paddingLeft: 50,
  	paddingRight: 50,
  	justifyContent: 'center',
  	alignItems: 'center',
  	borderWidth: 1,
  	borderRadius: 5,
  	marginTop: 5
  },
  quizTxt: {
  	color: white
  }
});

function mapStateToProps(flashCards) {
	return {
		flashCards
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getCurDeck: (key) => dispatch(getDeck(key))
	}
} 

export default connect(mapStateToProps, mapDispatchToProps)(deckDetails)