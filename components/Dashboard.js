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
          <View style={styles.header}>
           <Text>Todays Stats</Text>
          </View>

        <TouchableHighlight onPress={()=>Actions.reservationlist({hotel:hotel})}>
           <View style={styles.lineContainer}>
            <Image
             source={require('./images/reservation.png')}
             style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
            <Text style={styles.title}>Reservations</Text>
            <Text style={styles.title}>Reservations</Text>
           </View>
        </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>Actions.reservationlist({hotel:hotel})}>
           <View style={styles.lineContainer}>
            <Image
             source={require('./images/keyring-icon.png')}
             style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
            <Text style={styles.title}>Total Guests</Text>
            <Text style={styles.title}>Reservations</Text>
           </View>
        </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>Actions.guestlist({hotel:hotel})}>
           <View style={styles.lineContainer}>
            <Image
             source={require('./images/sign-check-icon.png')}
             style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
            <Text style={styles.title}>Availability</Text>
            <Text style={styles.title}>Reservations</Text>
           </View>
        </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>Actions.reservationlist({hotel:hotel})}>
           <View style={styles.lineContainer}>
            <Image
             source={require('./images/sign-error-icon.png')}
             style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
            <Text style={styles.title}>Occupancy</Text>
            <Text style={styles.title}>Reservations</Text>
           </View>
        </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={()=>Actions.reservationlist({hotel:hotel})}>
           <View style={styles.lineContainer}>
            <Image
             source={require('./images/envelope-icon.png')}
             style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
            <Text style={styles.title}>Emails Sent</Text>
            <Text style={styles.title}>Reservations</Text>
           </View>
        </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>Actions.reservationlist({hotel:hotel})}>
           <View style={styles.lineContainer}>
            <Image
             source={require('./images/key-icon.png')}
             style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
            <Text style={styles.title}>Logins</Text>
            <Text style={styles.title}>Reservations</Text>
           </View>
        </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>Actions.reservationlist({hotel:hotel})}>
           <View style={styles.lineContainer}>
            <Image
             source={require('./images/key-icon.png')}
             style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
            <Text style={styles.title}>Selected Items</Text>
            <Text style={styles.title}>Reservations</Text>
           </View>
        </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>Actions.reservationlist({hotel:hotel})}>
           <View style={styles.lineContainer}>
            <Image
             source={require('./images/folder-picture-icon.png')}
             style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
            <Text style={styles.title}>Pictures</Text>
            <Text style={styles.title}>Reservations</Text>
           </View>
        </View>
        </TouchableHighlight>
        <View style={styles.footer}>
        </View>

      </View>

    )
  }

}
const styles ={
  container: {
      flex:1,
      backgroundColor: '#F5FCFF',
      marginTop: 56,
      alignItems:'stretch',


  },
  header:{

    backgroundColor: '#F5FCFF',
    flex:3,
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  lineContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth:0.5,
    borderColor: "#555555",
    backgroundColor: '#F5FCFF',

  },
  footer:{

    backgroundColor: '#F5FCFF',
    flex:3,
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height:30,

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
		paddingRight: 30,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
  thumbnail: {
    width: 33,
    height: 38,
    margin:13,
    paddingLeft:30,


  },
  rightContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    padding:15
  },
  title:{
    fontSize:20,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center'
  },
 box:{
   textAlign: 'center',
   fontSize: 16
 },
}
module.exports = Dashboard;
