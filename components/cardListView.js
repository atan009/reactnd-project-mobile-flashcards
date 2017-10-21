import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, AsyncStorage, Modal } from 'react-native';
import { connect } from 'react-redux'
import { gray, white, red, green } from '../utils/colors'
import { 
	getDecks,
	deleteCard } from '../actions'

class cardListView extends React.Component {
	state = {
		modalVisible: false,
		curKey: null
	}

	setModalVisible(visible) {
	    this.setState({modalVisible: visible});
    }

    openModal(visible, key) {
    	this.setState({
    		curKey: key
    	})
    	this.setModalVisible(visible)
    }

    deleteCard(key) {
		this.props.delCard(key)
		this.setModalVisible(false)
		AsyncStorage.setItem('storageUID', JSON.stringify(this.props.flashCards))
	}

	static navigationOptions = ({ navigation }) => {
		const { key, title } = navigation.state.params

    	return {
  	  		title: `${title} - Delete Cards`
    	}
  	}

	renderItem(item) {
			return (
				<TouchableOpacity key={item.key} style={styles.card} onPress={this.openModal.bind(this,true, item.key)}>
			    	<Text style={styles.deckQuestion}>{item.question}</Text>
			    	<Text style={styles.deckAnswer}>{item.answer}</Text>
			    </TouchableOpacity>
			)
		}


	render() {
	  	const { flashCards } = this.props

  		// console.log(this.props)
	    return (
	      <View style={styles.container}>
	      	<Modal
	          animationType="slide"
	          transparent={false}
	          visible={this.state.modalVisible}
	          onRequestClose={() => {this.setModalVisible(!this.state.modalVisible)}}
	          >
	         <View style={styles.dltModal}>
	          <View>
	          	<Text style={{textAlign: 'center'}}>Are you sure?</Text>
	            <TouchableOpacity style={styles.yesBtn} onPress={this.deleteCard.bind(this,this.state.curKey)}>
	        		<Text style={{color: white}}>Yes</Text>
		        </TouchableOpacity>
		        <TouchableOpacity style={styles.noBtn} onPress={this.setModalVisible.bind(this,false)}>
		        	<Text style={{color: white}}>No</Text>
		        </TouchableOpacity>

	          </View>
	         </View>
	        </Modal>
	        {(flashCards.doneLoading && !flashCards.curDeck.cards.length && <Text>Add some cards</Text>) ||
	        	<FlatList
	        		data={flashCards.curDeck.cards}
	        		extraData={flashCards}
	        		renderItem={({ item }) => this.renderItem(item)}
	        		keyExtractor={(item) => item.key}
	        		style={styles.list}
	        	/>
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
    // justifyContent: 'center',
  },
  list: {
  	flex: 1,
  	alignSelf: 'stretch'
  },
  card: {
  	alignSelf: 'stretch',
  	borderWidth: 0.5,
  	borderTopWidth: 0
  },
  deckQuestion: {
  	textAlign: 'center',
  	fontSize: 24
  },
  deckAnswer: {
  	textAlign: 'center',
  	color: gray
  },
  dltModal: {
  	flex: 1,
    justifyContent: 'center',
  	alignItems: 'center',
  	margin: 45
  },
  noBtn: {
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
		delCard: (key) => dispatch(deleteCard(key))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(cardListView)