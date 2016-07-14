
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  Image,
  } from 'react-native';

//Scenes
import LoginView from './components/LoginView.js';
import SecureView from './components/SecureView.js'
import Dashboard from './components/Dashboard.js';
import ReservationList from './components/ReservationList.js';
import GuestList from './components/GuestList.js';
import AvailableGraph from './components/AvailableGraph.js';

import {Scene, Router,Actions} from 'react-native-router-flux';
import Drawer from 'react-native-drawer'
import SideDrawer from './components/SideDrawer.js';
import SideDrawerContent from './components/SideDrawerContent.js'


class navBarDash extends React.Component{

  render(){
   return(
     <View style={styles.navBar}>
        <TouchableOpacity
        style={styles.leftButtonContainer}
        onPress={Actions.pop}
        >
       <Image source={require('./components/images/ic_menu_white_24dp.png')} style={{height: 24, width: 24}} />
     </TouchableOpacity>
     <View style={styles.titleContainer} >
         <Text style={styles.navTitle}>Dashboard</Text>
       </View>
       <TouchableOpacity
       style={styles.leftButtonContainer}
       onPress={Actions.pop}
       >
      <Image style={{height: 24, width: 24}} />
    </TouchableOpacity>
     </View>

   )

  }
}

class navBarStats extends React.Component{

  render(){
   return(
     <View style={styles.navBar}>
        <TouchableOpacity
        style={styles.leftButtonContainer}
        onPress={Actions.pop}
        >
       <Image source={require('./components/images/ic_arrow_back_white_24dp.png')} style={{height: 24, width: 24}} />
     </TouchableOpacity>
     <View style={styles.titleContainer} >
         <Text style={styles.navTitle}>Statistics</Text>
       </View>
       <TouchableOpacity
       style={styles.leftButtonContainer}
       onPress={Actions.pop}
       >
      <Image style={{height: 24, width: 24}} />
    </TouchableOpacity>
     </View>

   )

  }
}




class hotel extends React.Component {
  renderMenuButton () {
		return (
			<TouchableOpacity
				style={styles.leftButtonContainer}
        onPress={Actions.pop}

			>
				<Image
					source={require('./components/images/ic_arrow_back_white_24dp.png')}
					style={{height: 24, width: 24}}
				/>
			</TouchableOpacity>
		)
	}


  renderTitle(){
    return(  <View style={styles.titleContainer} >
        <Text style={styles.navTitle}>Dashboard</Text>
      </View>
)


  }


  render() {
    return(
     <Router>
       <Scene key="root">
         <Scene key="pageOne" component={LoginView} initial={true} hideNavBar={true} />
         <Scene key="pageTwo" component={SecureView} title="PageTwo" hideNavBar={true} />
         <Scene key="dashboard" component={Dashboard} hideNavBar={false} navBar={navBarDash}/>
         <Scene key="reservationlist" component={ReservationList} title="ReservationList" hideNavBar={true} />
          <Scene key="guestlist" component={GuestList} title="GuestList" hideNavBar={true} />
          <Scene key="availableGraph" component={AvailableGraph} title="AvailableGraph" hideNavBar={false} navBar={navBarStats} />
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
		justifyContent: 'space-between',
		backgroundColor: '#1d1820',
    paddingTop: 0,
    top: 0,
    height: 54,
    right: 0,
    left: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#828287',
    position: 'absolute',
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
  titleContainer: {
    paddingLeft: 15,
    paddingRight: 20,
    flex: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
});

AppRegistry.registerComponent('hotel', () => hotel);
