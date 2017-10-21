import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, Animated, Modal, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { getDeck } from '../actions'
import { gray, white, red, green } from '../utils/colors'
import { deleteDeck } from '../actions'

class deckDetails extends Component {
	state = {
		opacity: new Animated.Value(0),
		modalVisible: false
	}

	setModalVisible(visible) {
	    this.setState({modalVisible: visible});
    }

	componentWillMount() {
		const { opacity } = this.state
		var self = this
		this.props.getCurDeck(this.props.navigation.state.params.key)
		Animated.timing(opacity, {toValue: 1, duration: 1000}).start()
	}

	deleteDeck(key) {
		this.setModalVisible(false)
		this.props.delDeck(key)
		this.props.navigation.goBack()
		AsyncStorage.setItem('storageUID', JSON.stringify(this.props.flashCards))
	}

  static navigationOptions = ({ navigation }) => {
  	const { key, title } = navigation.state.params


    return {
  	  title: `${title}`
    }
  }

  render() {
  	const { opacity } = this.state
  	const { flashCards } = this.props

    return (
      <Animated.View style={[styles.container, {opacity}]}>
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
        	<Text style={{color: white}}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dltBtn} onPress={() => this.props.navigation.navigate (
				'CardListView',
				{key: flashCards.curDeck.key,
					title: flashCards.curDeck.title},
				)}>
        	<Text style={{color: white}}>Delete Cards</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.setModalVisible(!this.state.modalVisible)}}
          >
         <View style={styles.dltModal}>
          <View>
          	<Text style={{textAlign: 'center'}}>Are you sure?</Text>
            <TouchableOpacity style={styles.yesBtn} onPress={this.deleteDeck.bind(this,this.props.navigation.state.params.key)}>
        		<Text style={{color: white}}>Yes</Text>
	        </TouchableOpacity>
	        <TouchableOpacity style={styles.dltBtn} onPress={this.setModalVisible.bind(this,false)}>
	        	<Text style={{color: white}}>No</Text>
	        </TouchableOpacity>

          </View>
         </View>
        </Modal>

        <TouchableOpacity style={styles.dltBtn} onPress={() => {
          this.setModalVisible(true)
        }}>
        	<Text style={{color: white}}>Delete Deck</Text>
        </TouchableOpacity>
      </Animated.View>
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
  dltBtn: {
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
  dltModal: {
  	flex: 1,
    justifyContent: 'center',
  	alignItems: 'center',
  	margin: 45
  },
  yesBtn: {
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
  }
});

function mapStateToProps(flashCards) {
	return {
		flashCards
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getCurDeck: (key) => dispatch(getDeck(key)),
		delDeck: (key) => dispatch(deleteDeck(key))
	}
} 

export default connect(mapStateToProps, mapDispatchToProps)(deckDetails)