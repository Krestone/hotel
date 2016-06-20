import React, { View, Component, PropTypes, Text, TouchableHighlight } from 'react'
//import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'

import SideDrawer from './SideDrawer.js'

export default class SideDrawerContent extends Component {
	static contextTypes = {
		drawer: PropTypes.object.isRequired,
	};

	render() {
		const { drawer } = this.context
		return (
			<View>
			<Text style={styles.title}>{this.props.hotel} Dashboard</Text>
			<TouchableHighlight onPress={()=>HotelAdminService.ReservationList(this.props.hotel)} style={styles.button}>
					<Text style={styles.buttonText}>Reservations</Text>
			</TouchableHighlight>
			<TouchableHighlight onPress={()=>HotelAdminService.ReservationList(this.props.hotel)} style={styles.button}>
					<Text style={styles.buttonText}>Guests</Text>
			</TouchableHighlight>
			<TouchableHighlight onPress={()=>HotelAdminService.ReservationList(this.props.hotel)} style={styles.button}>
					<Text style={styles.buttonText}>Food</Text>
			</TouchableHighlight>
			<TouchableHighlight onPress={()=>HotelAdminService.ReservationList(this.props.hotel)} style={styles.button}>
					<Text style={styles.buttonText}>Reservations</Text>
			</TouchableHighlight>
			</View>
		)
	}
}

SideDrawerContent.propTypes = {
	drawer: PropTypes.object
}

const styles ={
  container: {
      flex:1,
      padding: 30,
      marginTop: 65,
      alignItems: "stretch"
  },
  title:{
    fontSize:20,
    textAlign: 'center',
  },
  button: {
      height: 36,
      flex: 1,
      backgroundColor: "#555555",
      borderColor: "#555555",
      borderWidth: 1,
      borderRadius: 8,
      marginTop: 10,
      justifyContent: "center"
  },
  buttonText: {
      fontSize: 18,
      color: "#ffffff",
      alignSelf: "center"
  },
}
