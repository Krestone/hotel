import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ListView,
  Linking,
  TextInput,
  TouchableHighlight,
} from 'react-native';

var HotelAdminService = require('./services.js');
import LocalDb from './LocalDatabase.js';
import SearchBar from './searchBar.android.js';
import Dashboard from './Dashboard.js';

import { Actions } from 'react-native-router-flux';

class ReservationList extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    console.log("Prop in ReservationList constructor")
    console.log(this.props.reservations);
    this.state = {
       dataSource: ds.cloneWithRows(this.props.reservations),
    };
     this.renderHotel = this.renderHotel.bind(this);
  //   this.tester= HotelAdminService.tester.bind(this);
     //LocalDb.getAccessToken=LocalDb.getAccessToken.bind(this);
    // HotelAdminService.tester.bind(this);

  }




  render() {

  console.log("Props in ReservationList render");
  console.log(this.props.reservations);
    /*if (!(this.state.dataLoaded) ) {
      return this.renderLoadingView();
    }*/
    return (
        <View style={styles.viewContainer} >
          <SearchBar onChangeText={(e) => this.clickHotel(e)}>  </SearchBar>
            <ListView dataSource={this.state.dataSource} renderRow={this.renderHotel} style={styles.listView}/>

        </View>
  );
}

 renderLoadingView() {
   return (
     <View style={styles.container}>
       <Text style={styles.title}>
         Gelsin Filmler...
       </Text>
     </View>
   );
 }

 renderLoadingSearch() {
   return (
     <View style={styles.container}>
       <Text>
         Searching movie...
       </Text>
     </View>
   );
 }

 onHotelClick(hotel){
  let notice={
    Name: hotel.userName,
    Checkin: hotel.checkinDate,
    Checkout: hotel.checkoutDate,
    Roomtype: hotel.reservationType,
  }

   alert(JSON.stringify(notice));
 }

 renderHotel(hotel) {
   return (

     <TouchableOpacity onPress={()=>this.onHotelClick(hotel)}>

     <View style={styles.container}>

       <View style={styles.rightContainer}>
         <Text style={styles.title}>{hotel.userName}</Text>
         <Text style={styles.year}>Click for More Info!</Text>
       </View>
     </View>
     </TouchableOpacity>

   );
 }
}








const styles = StyleSheet.create({
  viewContainer: {
     flex: 1,
     flexDirection: 'column',
  },

  container: {
     flex: 1,
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',

   },

  thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer:{
    flex:1,

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
 listView: {
   paddingTop: 20,
   backgroundColor: '#F5FCFF',
 }


});




//AppRegistry.registerComponent('SecureView', () => SecureView);

module.exports = ReservationList;
