import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TextInput,
  Image,
  ToolbarAndroid,
} from 'react-native';


import { Actions } from 'react-native-router-flux';
var HotelAdminService = require('./services.js');


class Dashboard extends Component{
  constructor(props){
    super(props);
  //  Actions.reservationlist.bind(this);

    //this.ReservationList=HotelAdminService.ReservationList.bind(this);

  }

  render(){
    var hotel = this.props.hotel
    console.log(this.props.hotel);
    return(
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.hotel} Dashboard</Text>
        <TouchableHighlight onPress={()=>Actions.reservationlist({hotel:hotel})} style={styles.button}>
            <Text style={styles.buttonText}>Reservations</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>Actions.reservationlist({hotel: hotel})} style={styles.button}>
            <Text style={styles.buttonText}>Guests</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>Actions.reservationlist({hotel: hotel})} style={styles.button}>
            <Text style={styles.buttonText}>Food</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>Actions.reservationlist({hotel: hotel})} style={styles.button}>
            <Text style={styles.buttonText}>Reservations</Text>
        </TouchableHighlight>

      </View>

    )
  }

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
	navBar: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'top',
		justifyContent: 'center',
		backgroundColor: 'green',
	},
	navTitle: {
		color: 'white',
	},
	leftButtonContainer: {
		paddingLeft: 15,
		paddingRight: 20,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
}
module.exports = Dashboard;
