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
  TextInput
} from 'react-native';

//import ViewContainer from ".app/components/ViewContainer";
import LocalDb from './LocalDatabase.js';
import SearchBar from './searchBar.android.js';
var HotelAdminService = require('./services.js');
import Dashboard from './Dashboard.js';

import { Actions } from 'react-native-router-flux';


var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
var MOCKED_MOVIES_DATA = [
  {title: 'Avengers Age Of Ultron', year: '2015', posters: {thumbnail: 'http://i1.wp.com/www.slashfilm.com/wp/wp-content/images/Avengers-Age-of-Ultron-Poster.jpg'}} ,
  { title: 'LOLOLO', year: '2015', posters: {thumbnail: 'http://i1.wp.com/www.slashfilm.com/wp/wp-content/images/Avengers-Age-of-Ultron-Poster.jpg'}},
  { title: 'LALALA', year: '2015', posters: {thumbnail: 'http://i1.wp.com/www.slashfilm.com/wp/wp-content/images/Avengers-Age-of-Ultron-Poster.jpg'}},
  { title: 'hahaha', year: '2015', posters: {thumbnail: 'http://i1.wp.com/www.slashfilm.com/wp/wp-content/images/Avengers-Age-of-Ultron-Poster.jpg'}},
];




class SecureView extends Component {

  constructor(props) {
    super(props);
     var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
       dataSource: ds.cloneWithRows(this.props.hotels),
};
     this.renderHotel = this.renderHotel.bind(this);
  //   this.tester= HotelAdminService.tester.bind(this);
     //LocalDb.getAccessToken=LocalDb.getAccessToken.bind(this);
    // HotelAdminService.tester.bind(this);

  }




  render() {

  
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
   Actions.dashboard({hotel: hotel,});
 }

 renderHotel(hotel) {
   return (

     <TouchableOpacity onPress={()=>this.onHotelClick(hotel)}>

     <View style={styles.container}>

       <View style={styles.rightContainer}>
         <Text style={styles.title}>{hotel}</Text>
         <Text style={styles.year}>Search!</Text>
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

module.exports = SecureView;
