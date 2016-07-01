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
  DatePickerAndroid,
} from 'react-native';

var ProgressBar = require('ProgressBarAndroid');
import { Actions } from 'react-native-router-flux';
var HotelAdminService = require('./services.js');


class Dashboard extends Component{
  constructor(props){
    super(props);

  //  Actions.reservationlist.bind(this);
    let initNow= new Date();
    this.props.initNow = HotelAdminService.getNowInFormat(initNow); //format date

    this.state = {
     guestStatsLoaded:false,
     reservationStatsLoaded:false,
     guestStatsLoaded:false,
     occupiedLoaded:false,
     availableLoaded:false,
     loginsLoaded:false,
     loginStats:"",
     occupiedStats:"",
     guestStats:"",
     reservationStats:"",
     availableStats:"",
     progress:1,
     presetDate: new Date(2020, 4, 5),
     moment1:this.props.initNow,
     moment2:this.props.initNow,

   }

     this.getGuestStats=HotelAdminService.getGuestStats.bind(this);
     this.getReservationStats=HotelAdminService.getReservationStats.bind(this);
     this.getOccupiedItems=HotelAdminService.getOccupiedItems.bind(this);
     this.getAvailableItems=HotelAdminService.getAvailableItems.bind(this);
     this.getLogins=HotelAdminService.getLogins.bind(this);
  }

  getData(date, date_end){
    HotelAdminService.getReservationStats.bind(this)(date, date_end );
    HotelAdminService.getGuestStats.bind(this)(date, date_end );
    HotelAdminService.getOccupiedItems.bind(this)(date, date_end );
    HotelAdminService.getAvailableItems.bind(this)(date, date_end);
    HotelAdminService.getLogins.bind(this)(date, date_end );
  }

  //get the inital dates as today
  componentDidMount(){

    this.getData.bind(this)(this.state.moment1, this.state.moment2);//get stats from server
  }


 //ONEMLI!!!!: onClick lerde state optionlar sonuda batchlenip hep birlikte calisiyor.
 //Loadingin once olmasi, getData nin sonra olmasi icin setState i async callbackli lullan
  clickedOK(){
    let date1=this.state.moment1;
    let date2=this.state.moment2;
    //ikinci arguman callback
    this.setState(
      {guestStatsLoaded:false,
      reservationStatsLoaded:false,
      guestStatsLoaded:false,
      occupiedLoaded:false,
      availableLoaded:false,
      loginsLoaded:false} ,this.getData.bind(this)(date1,date2)

    )
  }
   async showPicker1(changedState,options) {
     console.log("date launched");
     try {

     const {action, year, month, day} = await DatePickerAndroid.open(options);
     if (action === DatePickerAndroid.dismissedAction) {
       console.log("Dismissed")
     } else {
       var date = new Date(year, month, day);
       //newState[stateKey + 'Text'] = date.toLocaleDateString();
       var newDate= HotelAdminService.getNowInFormat(date);
     }
     this.setState({moment1: newDate});
   } catch ({code, message}) {
     console.warn('Error in example', message);
   }
 }

 async showPicker2(changedState,options) {
   console.log("date launched");
   try {

   const {action, year, month, day} = await DatePickerAndroid.open(options);
   if (action === DatePickerAndroid.dismissedAction) {
     console.log("Dismissed")
   } else {
     var date = new Date(year, month, day);
     //newState[stateKey + 'Text'] = date.toLocaleDateString();
     var newDate= HotelAdminService.getNowInFormat(date);
   }
   this.setState({moment2: newDate});
 } catch ({code, message}) {
   console.warn('Error in example', message);
 }
}

  render(){


    console.log(this.state);
    console.log(this.props);
    var hotel = this.props.hotel

    //tum datalar gelene kadar progressbar
    if (!(this.state.guestStatsLoaded && this.state.reservationStatsLoaded && this.state.occupiedLoaded  && this.state.availableLoaded && this.state.loginsLoaded )){
      return this.renderLoadingView();
    }
    //let guestStats=(this.state.guestStats.length != 0) ? this.state.guestStats[0]["Y"] : [];


    let loginStats=this.state.loginStats[0]['Y'];
    let guestStats=this.state.guestStats[0]["Y"];
    let moment1=this.state.moment1;
    let moment2=this.state.moment2;
    console.log(loginStats);
    console.log(guestStats);
    console.log("moment1");
    console.log(moment1);


    return(
      <View style={styles.container}>
          <View style={styles.header}>
           <Text>Select Dates:</Text>
           <TouchableHighlight  onPress={ ()=>this.showPicker1({date: this.state.presetDate}) }>
              <Text>{moment1}</Text>
           </TouchableHighlight>
           <TouchableHighlight onPress={ ()=>this.showPicker2({date: this.state.presetDate}) }>
              <Text>{moment2}</Text>
           </TouchableHighlight>
           <TouchableHighlight onPress={()=>this.clickedOK()}>
              <Text>OK</Text>
           </TouchableHighlight>

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
            <Text style={styles.title}></Text>
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
            <Text style={styles.title}>{loginStats}</Text>
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
    justifyContent: 'space-between',
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
