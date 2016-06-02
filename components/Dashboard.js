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
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.hotel} Dashboard</Text>
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
  }
}
module.exports = Dashboard;
