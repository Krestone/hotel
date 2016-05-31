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
    this.state = {
       dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,

       }),
       dataLoaded: false,
       tokenLoaded:false,
     };
     this.renderMovie = this.renderMovie.bind(this);
     this.tester= HotelAdminService.tester.bind(this);
     LocalDb.getAccessToken=LocalDb.getAccessToken.bind(this);

  }

 //runs as soon as loaded
  componentDidMount() {
    LocalDb.getAccessToken();
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          dataLoaded:true,
        });
      })
      .done();
  }


  clickMovie(movie){
    var ur = movie.links.self
    alert(ur);
    Linking.openURL(ur);

  }


  searchMovie(movieName){
    //gets movies that contains
    var movieArray = this.state.dataSource._dataBlob.s1
    var searchedArray=[];

    for(var i=0; i<movieArray.length; i++){
      if(movieArray[i].title.includes(movieName)){
        searchedArray.push(movieArray[i]);
      }

    }

    console.log(searchedArray);





  }





  render() {
  //LocalDb.getAccessToken().then((value) => {console.log(value);})


    if (!(this.state.dataLoaded && this.state.tokenLoaded) ) {
      return this.renderLoadingView();
   }
   return (
        <View style={styles.viewContainer} >
          <SearchBar onChangeText={(e) => this.clickMovie(e)}>  </SearchBar>
          <ListView dataSource={this.state.dataSource} renderRow={this.renderMovie} style={styles.listView}/>
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

 renderMovie(movie) {
   return (

     <TouchableOpacity onPress={HotelAdminService.tester.bind(this)}>

     <View style={styles.container}>
       <Image
         source={{uri: movie.posters.thumbnail}}
         style={styles.thumbnail}
       />
       <View style={styles.rightContainer}>
         <Text style={styles.title}>{movie.title}</Text>
         <Text style={styles.year}>{movie.year}</Text>
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
