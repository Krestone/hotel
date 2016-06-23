import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ListView,
  RefreshControl,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  nativeEvent,
  event
} from 'react-native';

var HotelAdminService = require('./services.js');
import LocalDb from './LocalDatabase.js';
import SearchBar from './searchBar.android.js';
import Dashboard from './Dashboard.js';
import { filter, indexOf, invert, findKey,search,} from 'lodash-node';


import { Actions } from 'react-native-router-flux';

class ReservationList extends Component {

  constructor(props) {
    super(props);


    this.state = {
       dataLoaded:false,
       dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,
       }),
       refreshing: false,

    };
     this.renderHotel = this.renderHotel.bind(this);
     this.getReservationList=HotelAdminService.getReservationList.bind(this);
     this.setSearchText=this.setSearchText.bind(this)
    //  this.SearchBar=this.SearchBar.bind(this);
    // this.refreshData=this.refreshData.bind(this);
  //   this.tester= HotelAdminService.tester.bind(this);
     //LocalDb.getAccessToken=LocalDb.getAccessToken.bind(this);
    // HotelAdminService.tester.bind(this);

  }

  componentDidMount() {
  HotelAdminService.getReservationList.bind(this)();
  console.log("Props in componenetDidMount");
  console.log(this.props);
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






  _onRefresh() {


   this.setState({refreshing: true});

    let URL= 'http://checkinadvance.com/'+ 'api/HotelAdmin/GetReservations?key=' + this.props.hotel;

    AsyncStorage.getItem('access_token').then((value) =>{
      fetch(URL, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + value
      }
       })
       .then((response) => response.json())
       .then((responseData) => {

         console.log(responseData);
         this.setState({
           dataSource:this.state.dataSource.cloneWithRows(responseData),
         });
      }).then(() => this.setState({refreshing: false})).done();
    })



 }





  render() {
    console.log("Props in ReservationList render");
    console.log(this.props);

    if (!this.state.dataLoaded) {
      return this.renderLoadingView();
   }
  return (
        <View style={styles.viewContainer} >
        <TextInput
        value={this.state.searchText}
        onChange={this.setSearchText.bind(this)}
        placeholder='Search' />
            <ListView dataSource={this.state.dataSource} renderRow={this.renderHotel} style={styles.listView} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}/>}/>

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
   var icon;
   if(hotel.salutation == "mr"){
     icon= require('./images/icon.png');
   }
   else{
      require('./images/mrs.png');

   }
   return (

     <TouchableOpacity onPress={()=>this.onHotelClick(hotel)}>

     <View style={styles.container}>
     <Image
       source= {icon}
       style={styles.thumbnail}
     />

       <View style={styles.rightContainer}>
         <Text style={styles.title}>{hotel.userName}</Text>
         <Text style={styles.year}>Click for More Info!</Text>
       </View>
     </View>
     </TouchableOpacity>

   );
 }

 setSearchText(event) {
 let searchText = event.nativeEvent.text;
 this.setState({searchText:searchText});

let key=this.props.hotel
let URL='http://checkinadvance.com/' + 'api/HotelAdmin/GetReservations?key=' + key
AsyncStorage.getItem('access_token').then((value) =>{
  fetch(URL, {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + value
  }
   })
   .then((response) => response.json())
   .then((responseData) => {

     console.log(responseData);
     let filteredData = this.filterNotes(searchText, responseData);
     console.log('filteredData');
     console.log(filteredData);
     this.setState({
       dataSource: this.state.dataSource.cloneWithRows(filteredData),
       rawData: responseData,
     });



   }).done();
})
}

filterNotes(searchText, notes) {
  let text = searchText.toLowerCase();

  return filter(notes, (n) => {
     //console.log('inside filternotes')
   // console.log(n.userName)
    let note = n.userName.toLowerCase();
    if(note.search(text) !== -1){return n};
  });
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
