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
  nativeEvent,
  AsyncStorage,

} from 'react-native';

import { filter, indexOf, invert, findKey,search,} from 'lodash-node';

export default class SearchBar extends Component{
  constructor(props){
    super(props);

    this.state={
      searchText:"",
    };

    this.setSearchText=this.setSearchText.bind(this);
  }


  render(){
    console.log(this.props)
    return(

      <View>
        <TextInput
        value={this.state.searchText}
        onChange={this.setSearchText.bind(this)}
        placeholder='Search' />

      </View>
    );
  }

  setSearchText(event) {
  let searchText = event.nativeEvent.text;
  this.setState({searchText:searchText});

/*  base.fetch('notes', {
    context: this,
    asArray: true,
    then(data){
      let filteredData = this.filterNotes(searchText, data);
      this.setState({
        dataSource: this.ds.cloneWithRows(filteredData),
        rawData: data,
      });
    }
  });*/




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
      this.setState({
        dataSource: this.ds.cloneWithRows(filteredData),
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
     return note.search(text) !== -1;
   });
 }

}

const styles = StyleSheet.create({
  viewContainer:{
    flexDirection: 'row'

 },
 icon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  }


});









module.exports = SearchBar;
