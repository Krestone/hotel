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
  Navigator,

} from 'react-native';

import LoginView from './components/LoginView.js';
import SecureView from './components/SecureView.js'

//var services = require("./services.js");
class hotel extends Component {

  _renderScene(route, navigator) {
    //console.log(route.passProps)
    console.log("Route: ");
    console.log(route);
    //rendered component name is passed through the route props. (see this.push.navigator)
    var Component = route.component;

    return(
      <Component navigator={navigator} route={route}/>
    );



  }



  render() {
    return (
     <Navigator
      style={{ flex:1 }}
      initialRoute={{ name: 'Login', component: LoginView }}
      renderScene={ this._renderScene }
     />
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
