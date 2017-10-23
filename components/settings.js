import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, Switch } from 'react-native';
import { connect } from 'react-redux'
import { gray, white, red, green } from '../utils/colors'
import { toggleNotifications } from '../actions'
import { 
	getDailyReminderValue,
	clearLocalNotification,
	setLocalNotification} from '../utils/helper'

class Settings extends React.Component {
	handleToggleSwitch(notification) {
		if (notification) {
		
		clearLocalNotification()
		.then(setLocalNotification)
		.then(this.props.changeNotification())
		} else {
			clearLocalNotification()
			.then(this.props.changeNotification())
		}
		
	}

	componentDidUpdate() {
		AsyncStorage.setItem('storageUID', JSON.stringify(this.props.flashCards))
	}

	render() {
		const { flashCards } = this.props
		console.log(flashCards)
		return (
			<View style={styles.container}>
				<View style={{flex: 1}}>
					<Text style={{marginTop: 15}}>Push Notifcation: </Text>
					<Switch
						value={flashCards.notification}
						onValueChange={this.handleToggleSwitch.bind(this, !flashCards.notification)}
					/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
})

function mapStateToProps(flashCards) {
	return {
		flashCards
	}
}

function mapDispatchToProps(dispatch) {
	return {
		changeNotification: () => dispatch(toggleNotifications())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)