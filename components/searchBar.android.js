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



class SearchBar extends Component{
  render(){
    return(
       //<View style={styles.viewContainer}>
      <View>
        <TextInput defaultValue="Search Here"  />

      </View>
    );
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
