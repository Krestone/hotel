import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TextInput,
  Image
} from 'react-native';

var HotelAdminService = require('./services.js');

class Dashboard extends Component{
  constructor(props){
    super(props);

    this.ReservationList=HotelAdminService.ReservationList.bind(this);

  }

  render(){
    return(
      <View style={styles.container}>
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
module.exports = Dashboard;
