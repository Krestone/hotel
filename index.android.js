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

//Scenes
import LoginView from './components/LoginView.js';
import SecureView from './components/SecureView.js'
import Dashboard from './components/Dashboard.js';
import ReservationList from './components/ReservationList.js';
import GuestList from './components/GuestList.js';

import {Scene, Router} from 'react-native-router-flux';
import Drawer from 'react-native-drawer'
import SideDrawer from './components/SideDrawer.js';
import SideDrawerContent from './components/SideDrawerContent.js'
import NavBar from './components/NavBar.js'

class hotel extends React.Component {


  render() {
    return(
     <Router>
       <Scene key="root">
         <Scene key="pageOne" component={LoginView} initial={true} hideNavBar={true} />
         <Scene key="pageTwo" component={SecureView} title="PageTwo" hideNavBar={true} />
         <Scene key="dashboard" component={Dashboard} title="Dashboard" hideNavBar={false}/>
         <Scene key="reservationlist" component={ReservationList} title="ReservationList" hideNavBar={true} />
          <Scene key="guestlist" component={GuestList} title="GuestList" hideNavBar={true} />
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
  navBar: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'green',
	},
	navTitle: {
		color: 'white',
	},
	routerScene: {
		paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight, // some navbar padding to avoid content overlap
	},
	leftButtonContainer: {
		paddingLeft: 15,
		paddingRight: 20,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
});

AppRegistry.registerComponent('hotel', () => hotel);
