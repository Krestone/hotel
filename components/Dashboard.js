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

var ProgressBar = require('ProgressBarAndroid');
import { Actions } from 'react-native-router-flux';
var HotelAdminService = require('./services.js');


class Dashboard extends Component{
  constructor(props){
    super(props);
    let now=new Date();
    let year=now.getFullYear();
    let month=now.getMonth()+1;
    let day=now.getDate();
    if(day<10){
      day="0"+day;
    }
    if(month<10){
      month="0"+month;
    }
    this.props.date= month + "/" +day +"/"+year;
  //  Actions.reservationlist.bind(this);


    this.state = {
    guestStatsLoaded:false,
     reservationStatsLoaded:false,
     guestStatsLoaded:false,
     occupiedLoaded:false,
     availableLoaded:false,
     occupiedStats:[],
     guestStats:[],
     reservationStats:[],
     availableStats:[],
     progress:1,

   }

     this.getGuestStats=HotelAdminService.getGuestStats.bind(this);
     this.getReservationStats=HotelAdminService.getReservationStats.bind(this);
     this.getOccupiedItems=HotelAdminService.getOccupiedItems.bind(this);
     this.getAvailableItems=HotelAdminService.getAvailableItems.bind(this);
  }






  componentDidMount(){
    HotelAdminService.getReservationStats.bind(this)();
    HotelAdminService.getGuestStats.bind(this)();
    HotelAdminService.getOccupiedItems.bind(this)();
    //HotelAdminService.getAvailableItems.bind(this)();


  }

  render(){


    console.log(this.state);
    console.log(this.props);
    var hotel = this.props.hotel

    //tum datalar gelene kadar progressbar
    if (!(this.state.guestStatsLoaded && this.state.reservationStatsLoaded && this.state.occupiedLoaded  )){
      return this.renderLoadingView();
    }
    let guestStats=this.state.guestStats[0]["Y"];
    let occupiedStats=this.state.occupiedStats.length;
    //console.log(this.state.availabeStats);


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
            <Text style={styles.title}></Text>
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
            <Text style={styles.title}>{guestStats}</Text>
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
            <Text style={styles.title}></Text>
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
            <Text style={styles.title}>{occupiedStats}</Text>
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
  renderLoadingView() {
    return (
      <View style={styles.loadingContainer}>

          <ProgressBar progress={this.state.progress} />

      </View>
    );
  }


}
const styles ={
  container: {
      flex:1,
      backgroundColor: '#F5FCFF',
      marginTop: 56,
      alignItems:'stretch',


  },
  loadingContainer: {
      flex:1,
      backgroundColor: '#F5FCFF',
      marginTop: 56,
      alignItems:'stretch',
      justifyContent:'center'

  },
  header:{

    backgroundColor: '#F5FCFF',
    flex:3,
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center',


  },
  lineContainer:{
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth:0.5,
    borderColor: "#555555",
    backgroundColor: '#F5FCFF',


  },
  footer:{

    backgroundColor: '#F5FCFF',
    flex:1,
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
