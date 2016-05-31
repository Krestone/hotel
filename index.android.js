/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  } from 'react-native';

import LoginView from './components/LoginView.js';
import SecureView from './components/SecureView.js'
import {Scene, Router} from 'react-native-router-flux';


class hotel extends React.Component {
  render() {
    return(
     <Router>
       <Scene key="root">
         <Scene key="pageOne" component={LoginView} initial={true} hideNavBar={true} />
         <Scene key="pageTwo" component={SecureView} title="PageTwo" hideNavBar={true} />
       </Scene>
    </Router>
   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('hotel', () => hotel);
