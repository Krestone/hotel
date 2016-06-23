


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

import SecureView from './SecureView.js'
var HotelAdminService = require('./services.js')
var bgImage= require('./images/background.png');



class LoginView extends Component {



    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorMessage: "",

        };

       //binds 'this' keyword to LoginView.js(this file)
       this.login =HotelAdminService.login.bind(this);


      //console.log(this.onSubmitPressed())
    }
    componentDidMount() {

    }



  render() {
        return (
                <Image source={bgImage} style={styles.backgroundImage} >
                <View style={styles.container}>
                   <View>
                      <View style={styles.header}>
                    <Image style={styles.mark} source={require('./images/login1_mark3.png')} />
                  </View>
                <View style={styles.inputs}>
                   <View style={styles.inputContainer}>
                    <Image style={styles.inputUsername} source={require('./images/login1_person.png')}/>
                    <TextInput
                        placeholder="Username"
                        onChange={(event) => this.setState({username: event.nativeEvent.text})}
                        style={styles.formInput}
                        value={this.state.username} />
                   </View>
                   <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        onChange={(event) => this.setState({password: event.nativeEvent.text})}
                        style={styles.formInput}
                        value={this.state.password} />
                   </View>
                  </View>
                    <TouchableHighlight onPress={HotelAdminService.login.bind(this)} style={styles.button}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableHighlight>
                    <Text>{this.state.errorMessage}
                    </Text>
                    </View>
                    </View>
                </Image>
        );
    }


}




var styles = StyleSheet.create({


   container: {
      flex:1,
      flexDirection:'column',
      padding: 10,
      marginTop: 60,
      alignItems: "center"
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        textAlign:'center',

    },
    formInput: {
        height: 40,
        padding: 10,
        marginRight: 5,
        marginBottom: 5,
        marginTop: 5,
        flex: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#555555",
        borderRadius: 8,
        color: "#555555"
    },
    button: {
        height: 36,
        flex: 1,
        backgroundColor: "#555555",
        borderColor: "#555555",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 50,
        justifyContent: "center"
    },
    buttonText: {
        fontSize: 18,
        color: "#ffffff",
        alignSelf: "center"
    },
    backgroundImage: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    width:null,
    height:null,
  },
  inputContainer: {
       padding: 10,
       borderWidth: 1,
       borderBottomColor: 'transparent',
       borderColor: 'transparent',




   },
   input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
    },
    inputs: {
       marginTop: 30,
       marginBottom: 10,
       flex: .25
   },
    mark: {
       width: 150,
       height: 150
   },
   inputPassword: {
       marginLeft: 15,
       width: 20,
       height: 21
   },
   inputUsername: {
     marginLeft: 15,
     marginBottom: 5,
     width: 20,
     height: 20
   },
   header: {
       justifyContent: 'center',
       alignItems: 'center',
       flex: .5,
       backgroundColor: 'transparent'
   },


});

module.exports = LoginView;
